import { CalendarDays, Clock3 } from "lucide-react";
import EmptyState from "./EmptyState";
import RequestActions from "./RequestActions";
import StatusBadge from "./StatusBadge"

const RequestDesktopTable = ({ requests, onStatusChange, onDelete }) => (
  <div className="hidden overflow-x-auto xl:block">
    <table className="w-full min-w-[1050px] text-left">
      <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
        <tr>
          <th className="px-5 py-4">Recipient</th>
          <th className="px-5 py-4">Hospital</th>
          <th className="px-5 py-4">Location</th>
          <th className="px-5 py-4">Schedule</th>
          <th className="px-5 py-4">Status</th>
          <th className="px-5 py-4">Donor info</th>
          <th className="px-5 py-4 text-right">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-100">
        {requests.length > 0 ? (
          requests.map((request) => (
            <tr key={request._id} className="align-top hover:bg-slate-50">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-red-700">
                    {request.bloodGroup || "N/A"}
                  </span>
                  <div>
                    <p className="font-bold text-slate-950">
                      {request.recipientName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Blood group {request.bloodGroup || "not set"}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4">
                <p className="font-semibold text-slate-800">
                  {request.hospitalName}
                </p>
              </td>

              <td className="px-5 py-4">
                <p className="max-w-64 text-sm text-slate-600">
                  {request.address}, {request.upazila}, {request.district}
                </p>
              </td>

              <td className="px-5 py-4">
                <div className="space-y-1 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-slate-400" />
                    {request.donationDate || "Date not set"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-slate-400" />
                    {request.donationTime || "Time not set"}
                  </p>
                </div>
              </td>

              <td className="px-5 py-4">
                <StatusBadge status={request.donationStatus} />
              </td>

              <td className="px-5 py-4">
                {request.donationStatus === "inprogress" ? (
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="font-semibold text-slate-900">
                      {request.requesterName || "Name unavailable"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {request.requesterEmail || "Email unavailable"}
                    </p>
                  </div>
                ) : (
                  <span className="text-sm text-slate-400">No donor yet</span>
                )}
              </td>

              <td className="px-5 py-4">
                <RequestActions
                  request={request}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="px-5 py-16 text-center">
              <EmptyState />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default RequestDesktopTable;
