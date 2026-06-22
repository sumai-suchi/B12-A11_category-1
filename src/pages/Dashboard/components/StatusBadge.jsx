import { statusClass, statusLabel } from "./utils"

const StatusBadge = ({ status, className = "" }) => (
  <span
    className={`rounded-full border px-3 py-1 text-xs font-bold capitalize ${statusClass(
      status
    )} ${className}`}
  >
    {statusLabel(status)}
  </span>
);

export default StatusBadge;
