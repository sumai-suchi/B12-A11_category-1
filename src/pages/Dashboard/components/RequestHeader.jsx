import { Droplet } from "lucide-react";
import { filterOptions } from "./constants"

const RequestHeader = ({ counts, statusFilter, onFilter }) => (
  <div className="mb-6 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[1fr_330px]">
    <div className="p-5 sm:p-7">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white">
          <Droplet className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-red-600">
            BloodCare Dashboard
          </p>
          <h1 className="text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
            My donation requests
          </h1>
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-slate-600">
        Review your created requests, check donor progress, and update each
        request when a donation is completed or canceled.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filterOptions.slice(0, 4).map((item) => (
          <button
            key={item.value}
            onClick={() => onFilter(item.value)}
            className={`rounded-xl border px-4 py-3 text-left transition ${
              statusFilter === item.value
                ? "border-red-200 bg-red-50"
                : "border-slate-200 bg-white hover:border-red-200"
            }`}
          >
            <p className="text-2xl font-bold text-slate-950">
              {counts[item.value]}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase text-slate-500">
              {item.label}
            </p>
          </button>
        ))}
      </div>
    </div>

    <div className="relative hidden min-h-64 lg:block">
      <img
        src="/BloodDonationImg.png"
        alt="Blood donation"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10" />
    </div>
  </div>
);

export default RequestHeader;
