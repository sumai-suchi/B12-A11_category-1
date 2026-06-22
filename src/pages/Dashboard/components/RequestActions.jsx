import { NavLink } from "react-router";
import { Check, Edit3, Eye, Trash2, X } from "lucide-react";

const RequestActions = ({ request, onStatusChange, onDelete, compact = false }) => {
  const buttonSize = compact ? "h-9 px-3" : "h-9 px-3";
  const iconButtonSize = compact ? "h-9 px-3" : "h-9 w-9";

  return (
    <div className="flex flex-wrap gap-2 xl:justify-end">
      {request.donationStatus === "inprogress" && (
        <>
          <button
            onClick={() => onStatusChange("done", request._id)}
            className={`inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700 ${buttonSize}`}
          >
            <Check className="h-4 w-4" />
            Done
          </button>
          <button
            onClick={() => onStatusChange("canceled", request._id)}
            className={`inline-flex items-center gap-1.5 rounded-lg bg-rose-600 text-xs font-bold text-white hover:bg-rose-700 ${buttonSize}`}
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        </>
      )}

      <NavLink
        to={`/dashboard/donation-request-details-page/${request._id}`}
        className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 ${iconButtonSize}`}
        title="Edit"
      >
        <Edit3 className="h-4 w-4" />
        {compact && "Edit"}
      </NavLink>

      <NavLink
        to={`/dashboard/donation-details-page/${request._id}`}
        className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 ${iconButtonSize}`}
        title="Details"
      >
        <Eye className="h-4 w-4" />
        {compact && "Details"}
      </NavLink>

      <button
        onClick={() => onDelete(request._id)}
        className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 text-xs font-bold text-rose-600 hover:bg-rose-50 ${iconButtonSize}`}
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
        {compact && "Delete"}
      </button>
    </div>
  );
};

export default RequestActions;
