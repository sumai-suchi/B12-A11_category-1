import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const DEBOUNCE_MS = 400;

/**
 * Custom hook that fetches the logged-in user's donation requests from the
 * backend with server-side filtering, searching and pagination.
 *
 * @param {object} params
 * @param {string} params.statusFilter  – "all" | "pending" | "inprogress" | "done" | "canceled"
 * @param {string} params.searchText   – free-text keyword
 * @param {number} params.currentPage  – 1-based page index
 * @param {number} params.pageSize     – items per page
 *
 * @returns {object}
 *   requests      – current page of donation requests
 *   totalItems    – total matching items (after filter + search)
 *   totalPages    – total pages
 *   isLoading     – fetch in-flight
 *   error         – last fetch error (or null)
 *   optimisticUpdateStatus  – update a request's status locally without refetch
 *   optimisticDelete        – remove a request locally without refetch
 *   refetch       – force a fresh fetch
 */
const useDonationRequests = ({
  statusFilter,
  searchText,
  currentPage,
  pageSize,
}) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests]   = useState([]);
  const [totalItems, setTotal]    = useState(0);
  const [totalPages, setPages]    = useState(1);
  const [isLoading, setLoading]   = useState(false);
  const [error, setError]         = useState(null);

  // ── debounced search ────────────────────────────────────────────────────
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);
  const debounceTimer = useRef(null);

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounceTimer.current);
  }, [searchText]);

  // ── fetch ───────────────────────────────────────────────────────────────
  const fetchRequests = useCallback(async () => {
    if (!user?.email) return;

    setLoading(true);
    setError(null);

    try {
      const params = {
        page:   currentPage,
        limit:  pageSize,
      };

      if (statusFilter && statusFilter !== "all") {
        params.status = statusFilter;
      }

      if (debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }

      const res = await axiosSecure.get("/my-donation-request", { params });

      setRequests(res.data.data);
      setTotal(res.data.totalCount);
      setPages(res.data.totalPages);
    } catch (err) {
      console.error("useDonationRequests fetch error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [
    user?.email,
    axiosSecure,
    statusFilter,
    debouncedSearch,
    currentPage,
    pageSize,
  ]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // ── optimistic helpers (avoid a full refetch for status / delete) ───────

  /**
   * Optimistically update the donationStatus of a request in local state.
   * Call AFTER your PATCH has succeeded.
   */
  const optimisticUpdateStatus = useCallback((id, donationStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, donationStatus } : r))
    );
  }, []);

  /**
   * Optimistically remove a deleted request from local state.
   * If the current page becomes empty after deletion, trigger a refetch.
   */
  const optimisticDelete = useCallback(
    (id) => {
      setRequests((prev) => {
        const next = prev.filter((r) => r._id !== id);
        // If this was the last item on the page, a refetch is needed —
        // the parent component should detect requests.length === 0 after
        // deletion and decrement the page or call refetch.
        return next;
      });
      setTotal((prev) => Math.max(0, prev - 1));
    },
    []
  );

  return {
    requests,
    totalItems,
    totalPages,
    isLoading,
    error,
    optimisticUpdateStatus,
    optimisticDelete,
    refetch: fetchRequests,
  };
};

export default useDonationRequests;
