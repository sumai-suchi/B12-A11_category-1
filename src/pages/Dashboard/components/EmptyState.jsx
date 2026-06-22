import { Droplet } from "lucide-react";

const EmptyState = () => (
  <div className="mx-auto max-w-sm text-center">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
      <Droplet className="h-7 w-7" />
    </div>
    <h3 className="mt-4 text-lg font-bold text-slate-950">
      No donation requests found
    </h3>
    <p className="mt-2 text-sm leading-6 text-slate-500">
      Try another status filter or search term. Created donation requests will
      show up here.
    </p>
  </div>
);

export default EmptyState;
