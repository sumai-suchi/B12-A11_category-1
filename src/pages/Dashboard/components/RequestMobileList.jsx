import { CalendarDays, Clock3, MapPin, UserRound } from "lucide-react";
import EmptyState from "./EmptyState";
import RequestActions from "./RequestActions";
import StatusBadge from "./StatusBadge";

const RequestMobileList = ({ requests, onStatusChange, onDelete }) => (
  <div className="grid gap-3 p-4 xl:hidden">
    {requests.length > 0 ? (
      requests.map((request) => (
        <article
          key={request._id}
          className="rounded-2xl border border-slate-200 bg-white p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-red-700">
                {request.bloodGroup || "N/A"}
              </span>
              <div className="min-w-0">
                <h3 className="truncate font-bold text-slate-950">
                  {request.recipientName}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {request.hospitalName}
                </p>
              </div>
            </div>

            <StatusBadge
              status={request.donationStatus}
              className="shrink-0 px-2.5"
            />
          </div>

          <div className="mt-4 grid gap-2 text-sm text-slate-600">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <span>
                {request.address}, {request.upazila}, {request.district}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-slate-400" />
              {request.donationDate || "Date not set"}
            </p>
            <p className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-slate-400" />
              {request.donationTime || "Time not set"}
            </p>
          </div>

          {request.donationStatus === "inprogress" && (
            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <UserRound className="h-4 w-4 text-slate-500" />
                {request.requesterName || "Name unavailable"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {request.requesterEmail || "Email unavailable"}
              </p>
            </div>
          )}

          <div className="mt-4">
            <RequestActions
              compact
              request={request}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          </div>
        </article>
      ))
    ) : (
      <EmptyState />
    )}
  </div>
);

export default RequestMobileList;
