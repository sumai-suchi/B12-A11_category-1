import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { PAGE_SIZE_OPTIONS } from "./constants";

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Build an array of page tokens that looks like:
 *   [1, 2, "…", 7, 8, 9, "…", 14, 15]
 * (ellipsis is the string "…")
 */
const buildPageTokens = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const tokens = new Set([1, 2, current - 1, current, current + 1, total - 1, total]);

  return [...tokens]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b)
    .reduce((acc, page, idx, arr) => {
      if (idx > 0 && page - arr[idx - 1] > 1) acc.push("…");
      acc.push(page);
      return acc;
    }, []);
};

// ─── sub-components ─────────────────────────────────────────────────────────

const NavBtn = ({ onClick, disabled, title, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className="
      inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200
      text-slate-500 transition
      hover:border-red-300 hover:bg-red-50 hover:text-red-700
      disabled:cursor-not-allowed disabled:opacity-40
      disabled:hover:border-slate-200 disabled:hover:bg-transparent disabled:hover:text-slate-500
    "
  >
    {children}
  </button>
);

const PageBtn = ({ page, current, onClick }) => {
  const isActive = page === current;
  return (
    <button
      onClick={() => onClick(page)}
      aria-current={isActive ? "page" : undefined}
      className={`
        inline-flex h-9 min-w-[36px] items-center justify-center rounded-lg border px-2 text-sm font-semibold transition
        ${
          isActive
            ? "border-red-300 bg-red-600 text-white shadow-sm"
            : "border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
        }
      `}
    >
      {page}
    </button>
  );
};

// ─── main component ──────────────────────────────────────────────────────────

/**
 * Props
 *  currentPage   – 1-based current page index
 *  totalItems    – total number of items (after filtering / searching)
 *  pageSize      – items per page
 *  onPageChange  – (newPage: number) => void
 *  onPageSize    – (newSize: number) => void
 */
const RequestPagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSize,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // clamp current page within valid range
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const firstItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const lastItem = Math.min(safePage * pageSize, totalItems);

  const tokens = buildPageTokens(safePage, totalPages);

  return (
    <div className="flex flex-col items-center gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-between">
      {/* left: item range + per-page selector */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <span>
          {totalItems === 0
            ? "No results"
            : `Showing ${firstItem}–${lastItem} of ${totalItems}`}
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="page-size-select" className="font-medium text-slate-600">
            Per page:
          </label>
          <select
            id="page-size-select"
            value={pageSize}
            onChange={(e) => {
              onPageSize(Number(e.target.value));
              onPageChange(1);
            }}
            className="
              h-8 rounded-lg border border-slate-200 bg-white px-2 text-sm font-semibold text-slate-700
              outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-50
            "
          >
            {PAGE_SIZE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* right: nav buttons */}
      <div className="flex items-center gap-1.5">
        {/* first page */}
        <NavBtn
          onClick={() => onPageChange(1)}
          disabled={safePage === 1}
          title="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </NavBtn>

        {/* prev page */}
        <NavBtn
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage === 1}
          title="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </NavBtn>

        {/* numbered pages */}
        {tokens.map((token, idx) =>
          token === "…" ? (
            <span
              key={`ellipsis-${idx}`}
              className="inline-flex h-9 w-9 items-center justify-center text-slate-400 select-none"
            >
              …
            </span>
          ) : (
            <PageBtn
              key={token}
              page={token}
              current={safePage}
              onClick={onPageChange}
            />
          )
        )}

        {/* next page */}
        <NavBtn
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage === totalPages}
          title="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </NavBtn>

        {/* last page */}
        <NavBtn
          onClick={() => onPageChange(totalPages)}
          disabled={safePage === totalPages}
          title="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </NavBtn>
      </div>
    </div>
  );
};

export default RequestPagination;
