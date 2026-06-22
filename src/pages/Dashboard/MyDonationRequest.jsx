import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import RequestDesktopTable from "./components/RequestDesktopTable";
import RequestHeader from "./components/RequestHeader";
import RequestMobileList from "./components/RequestMobileList";
import RequestPagination from "./components/RequestPagination";
import RequestToolbar from "./components/RequestToolbar";
import { DEFAULT_PAGE_SIZE } from "./components/constants";

const MyDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [allRequests, setAllRequests] = useState([]);
  const [counts, setCounts] = useState({ all: 0, pending: 0, inprogress: 0, done: 0, canceled: 0 });
  const [totalCount, setTotalCount] = useState(0);

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // ─── fetch counts ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user?.email) return;
    const fetchCounts = async () => {
      try {
        const res = await axiosSecure.get(`/my-donation-request/counts`);
        setCounts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCounts();
  }, [axiosSecure, user?.email]);

  // ─── fetch paginated/filtered requests ───────────────────────────────────
  useEffect(() => {
    if (!user?.email) return;
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get(
          `/my-donation-request?status=${statusFilter}&search=${searchText}&page=${currentPage}&limit=${pageSize}`
        );
        setAllRequests(res.data.data || []);
        setTotalCount(res.data.totalCount || 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, [axiosSecure, user?.email, statusFilter, searchText, currentPage, pageSize]);

  // ─── reset page on filter / search / page-size change ───────────────────
  const handleFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handlePageSize = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // ─── actions ─────────────────────────────────────────────────────────────
  const handleStatus = async (donationStatus, _id) => {
    try {
      await axiosSecure.patch(
        `/update/userRequest/status?id=${_id}&donationStatus=${donationStatus}`
      );

      // Optimistically update the list
      setAllRequests((prev) =>
        prev.map((request) =>
          request._id === _id ? { ...request, donationStatus } : request
        )
      );
      
      // Re-fetch counts
      const countsRes = await axiosSecure.get(`/my-donation-request/counts`);
      setCounts(countsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteOne = async (id) => {
    try {
      await axiosSecure.delete(`/userRequest/${id}`);
      
      // Optimistically update the list
      setAllRequests((prev) => prev.filter((request) => request._id !== id));
      
      // Update totals optimistically
      setTotalCount((prev) => Math.max(0, prev - 1));
      
      // Re-fetch counts
      const countsRes = await axiosSecure.get(`/my-donation-request/counts`);
      setCounts(countsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ─── render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f6f7f9] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-7xl"
      >
        <RequestHeader
          counts={counts}
          statusFilter={statusFilter}
          onFilter={handleFilter}
        />

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <RequestToolbar
            totalRequests={counts.all}
            visibleCount={allRequests.length}
            searchText={searchText}
            statusFilter={statusFilter}
            onSearchChange={handleSearch}
            onFilter={handleFilter}
          />

          <RequestDesktopTable
            requests={allRequests}
            onStatusChange={handleStatus}
            onDelete={handleDeleteOne}
          />

          <RequestMobileList
            requests={allRequests}
            onStatusChange={handleStatus}
            onDelete={handleDeleteOne}
          />

          <RequestPagination
            currentPage={currentPage}
            totalItems={totalCount}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSize={handlePageSize}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default MyDonationRequest;
