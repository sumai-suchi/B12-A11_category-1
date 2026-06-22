import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import {
  Activity,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Droplet,
  Edit3,
  FileText,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Trash2,
  UserRound,
  XCircle,
} from "lucide-react";

const statusStyle = {
  pending: "bg-amber-100 text-amber-700",
  inprogress: "bg-blue-100 text-blue-700",
  done: "bg-emerald-100 text-emerald-700",
  cancel: "bg-red-100 text-red-700",
};

const getStatusClass = (status) =>
  statusStyle[status] || "bg-slate-100 text-slate-700";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [MyRequest, setMyRequest] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      const res = await axiosSecure.get(
        `/my-donation-request?email=${user.email}&limit=3`
      );
      setMyRequest(res.data.data || []);
    };

    fetchData();
  }, [axiosSecure, user?.email]);

  const handleStatus = async (donationStatus, _id) => {
    try {
      await axiosSecure.patch(
        `/update/userRequest/status?id=${_id}&donationStatus=${donationStatus}`
      );
      setMyRequest((prev) =>
        prev.map((u) => (u._id === _id ? { ...u, donationStatus } : u))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOne = async (id) => {
    try {
      await axiosSecure.delete(`/userRequest/${id}`);
      setMyRequest((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const totalRequests = MyRequest.length;
  const activeRequests = useMemo(
    () =>
      MyRequest?.filter((req) =>
        ["pending", "inprogress"].includes(req.donationStatus)
      ).length || 0,
    [MyRequest]
  );
  const completedRequests = useMemo(
    () => MyRequest?.filter((req) => req.donationStatus === "done").length || 0,
    [MyRequest]
  );
  const nextRequest = MyRequest[0];

  const stats = [
    {
      label: "My Requests",
      value: totalRequests,
      helper: "Latest 3 shown",
      icon: FileText,
      tone: "bg-red-50 text-red-600",
    },
    {
      label: "Active Cases",
      value: activeRequests,
      helper: "Pending or in progress",
      icon: Activity,
      tone: "bg-blue-50 text-blue-600",
    },
    {
      label: "Completed",
      value: completedRequests,
      helper: "Successful donations",
      icon: CheckCircle2,
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Profile",
      value: user?.email ? "Live" : "Guest",
      helper: user?.email || "Sign in required",
      icon: ShieldCheck,
      tone: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100">
      <img
        src="/BloodDonationImg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-red-50/90" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col gap-4 rounded-3xl bg-red-700 p-6 text-white shadow-2xl shadow-red-900/20 md:flex-row md:items-center md:justify-between lg:p-8"
        >
          <div>
            <p className="text-sm font-semibold text-red-100">Welcome back</p>
            <h1 className="mt-2 text-3xl font-black tracking-normal sm:text-5xl">
              Hi, {user?.displayName || "Donor"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-red-50 sm:text-base">
              Manage your donation requests, track urgent cases, and keep your
              donor activity organized from one clean dashboard.
            </p>
          </div>

          <div className="rounded-2xl bg-white/12 p-5 ring-1 ring-white/20 md:w-72">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-red-50">Donor Status</p>
              <Droplet className="h-5 w-5" />
            </div>
            <p className="mt-4 text-4xl font-black">Ready</p>
            <p className="mt-1 text-sm text-red-50">
              Keep your profile updated for faster matching.
            </p>
          </div>
        </motion.div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${stat.tone}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300" />
                </div>
                <p className="mt-5 text-sm font-semibold text-slate-500">
                  {stat.label}
                </p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">
                  {stat.value}
                </h2>
                <p className="mt-1 truncate text-sm text-slate-500">
                  {stat.helper}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.75fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6"
          >
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-red-600">
                  My Donation Requests
                </p>
                <h2 className="text-2xl font-black text-slate-950">
                  Recent requests overview
                </h2>
              </div>
              <NavLink
                to="/dashboard/my-donation-request"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
              >
                View All Requests
                <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>

            {MyRequest.length > 0 ? (
              <div className="space-y-3">
                {MyRequest.map((req) => (
                  <article
                    key={req._id}
                    className="grid gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-red-200 hover:bg-red-50/40 lg:grid-cols-[1fr_auto]"
                  >
                    <div className="flex gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-red-100 text-lg font-black text-red-700">
                        {req.bloodGroup || "N/A"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-black text-slate-950">
                            {req.recipientName}
                          </h3>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusClass(
                              req.donationStatus
                            )}`}
                          >
                            {req.donationStatus}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-slate-600">
                          {req.hospitalName}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {req.address}, {req.upazila}, {req.district}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="h-3.5 w-3.5" />
                            {req.donationDate} at {req.donationTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                      {req.donationStatus === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatus("done", req._id)}
                            className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-700"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Done
                          </button>
                          <button
                            onClick={() => handleStatus("cancel", req._id)}
                            className="inline-flex items-center gap-1 rounded-xl bg-amber-500 px-3 py-2 text-sm font-bold text-white hover:bg-amber-600"
                          >
                            <XCircle className="h-4 w-4" />
                            Cancel
                          </button>
                        </>
                      )}

                      <NavLink
                        to={`/dashboard/donation-request-details-page/${req._id}`}
                        className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white hover:bg-slate-800"
                      >
                        <Edit3 className="h-4 w-4" />
                      </NavLink>

                      <button
                        onClick={() => handleDeleteOne(req._id)}
                        className="grid h-10 w-10 place-items-center rounded-xl bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <Droplet className="mx-auto h-10 w-10 text-red-500" />
                <h3 className="mt-3 text-xl font-black text-slate-950">
                  No donation requests found
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Your latest donation requests will appear here.
                </p>
              </div>
            )}
          </motion.section>

          <div className="grid gap-6">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-red-600">
                    Quick Profile
                  </p>
                  <h2 className="text-2xl font-black text-slate-950">
                    Donor identity
                  </h2>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600">
                  <UserRound className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Name
                  </p>
                  <p className="mt-1 font-black text-slate-950">
                    {user?.displayName || "Donor"}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Email
                  </p>
                  <p className="mt-1 truncate font-black text-slate-950">
                    {user?.email || "Not available"}
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                  <CalendarClock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-red-200">
                    Next Request
                  </p>
                  <h2 className="text-xl font-black">
                    {nextRequest?.hospitalName || "No upcoming request"}
                  </h2>
                </div>
              </div>

              {nextRequest ? (
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <p className="flex items-center gap-2">
                    <HeartPulse className="h-4 w-4 text-red-300" />
                    {nextRequest.recipientName} needs {nextRequest.bloodGroup}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-red-300" />
                    {nextRequest.donationDate} at {nextRequest.donationTime}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-300" />
                    Keep your phone active for updates.
                  </p>
                </div>
              ) : (
                <p className="mt-5 text-sm text-slate-300">
                  When you create or receive a request, the closest upcoming
                  item will be highlighted here.
                </p>
              )}
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
