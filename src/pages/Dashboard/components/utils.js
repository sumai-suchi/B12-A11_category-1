import { statusClasses } from "./constants"

export const statusLabel = (status) => {
  if (status === "inprogress") return "In progress";
  if (status === "cancel" || status === "canceled") return "Canceled";
  return status || "Unknown";
};

export const statusClass = (status) =>
  statusClasses[status] || "bg-slate-50 text-slate-700 border-slate-200";



