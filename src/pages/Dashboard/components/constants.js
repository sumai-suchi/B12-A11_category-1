export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
export const DEFAULT_PAGE_SIZE = 10;

export const filterOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In progress", value: "inprogress" },
  { label: "Done", value: "done" },
  { label: "Canceled", value: "canceled" },
];

export const statusClasses = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  inprogress: "bg-sky-50 text-sky-700 border-sky-200",
  done: "bg-emerald-50 text-emerald-700 border-emerald-200",
  canceled: "bg-rose-50 text-rose-700 border-rose-200",
  cancel: "bg-rose-50 text-rose-700 border-rose-200",
};
