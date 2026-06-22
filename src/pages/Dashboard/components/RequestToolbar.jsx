import { NavLink } from "react-router";
import { ChevronDown, FilePlus2, Search } from "lucide-react";
import { filterOptions } from "./constants"

const RequestToolbar = ({
  totalRequests,
  visibleCount,
  searchText,
  statusFilter,
  onSearchChange,
  onFilter,
}) => (
  <div className="border-b border-slate-200 p-4 sm:p-5">
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h2 className="text-lg font-bold text-slate-950">Request list</h2>
        <p className="mt-1 text-sm text-slate-500">
          Showing {visibleCount} of {totalRequests} requests
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by recipient, hospital, area"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-50 sm:w-80"
          />
        </label>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(event) => onFilter(event.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-50 sm:w-44"
          >
            {filterOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        <NavLink
          to="/dashboard/add-request"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700"
        >
          <FilePlus2 className="h-4 w-4" />
          New request
        </NavLink>
      </div>
    </div>
  </div>
);

export default RequestToolbar;
