import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { Listbox } from "@headlessui/react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Droplet,
  Edit3,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

const TextInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  readOnly = false,
}) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-slate-700">
      {label}
    </span>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      readOnly={readOnly}
      className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition ${
        readOnly
          ? "border-slate-200 bg-slate-100 text-slate-500"
          : "border-slate-200 bg-white text-slate-900 focus:border-red-300 focus:ring-4 focus:ring-red-50"
      }`}
    />
  </label>
);

const SelectInput = ({ label, value, setValue, options }) => (
  <div>
    <span className="mb-2 block text-sm font-semibold text-slate-700">
      {label}
    </span>
    <Listbox value={value || ""} onChange={setValue}>
      <div className="relative">
        <Listbox.Button className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-semibold text-slate-900 outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-50">
          <span className="capitalize">{value || "Select status"}</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </Listbox.Button>
        <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
          {options.map((option) => (
            <Listbox.Option
              key={option}
              value={option}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold capitalize text-slate-700 hover:bg-red-50 hover:text-red-700"
            >
              {option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  </div>
);

const InfoItem = ({ icon: Icon, label, value }) => (
  <motion.div
    whileHover={{ y: -3 }}
    transition={{ type: "spring", stiffness: 260, damping: 22 }}
    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
  >
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
      <Icon className="h-5 w-5" />
    </div>
    <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
    <p className="mt-1 break-words text-sm font-bold text-slate-900">
      {value || "Not added"}
    </p>
  </motion.div>
);

const Badge = ({ children, tone = "slate" }) => {
  const styles = {
    red: "bg-red-50 text-red-700 border-red-200",
    blue: "bg-sky-50 text-sky-700 border-sky-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    slate: "bg-slate-50 text-slate-700 border-slate-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold capitalize ${
        styles[tone]
      }`}
    >
      {children || "Not set"}
    </span>
  );
};

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/user/role/${user?.email}`);
        setFormData({
          name: res.data.name || "",
          email: res.data.email,
          mainPhotoUrl: res.data.mainPhotoUrl || "",
          bloodGroup: res.data.bloodGroup || "",
          districts: res.data.districts || "",
          upazila: res.data.upazila || "",
          role: res.data.role,
          status: res.data.status || "",
          createdAt: res.data.createdAt || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.email) fetchData();
  }, [axiosSecure, user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/update/singleUser?email=${user?.email}`, formData);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative min-h-56 bg-slate-950">
            <img
              src="/BloodDonationImg.png"
              alt="Blood donation"
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-red-900/40" />

            <div className="relative p-6 sm:p-8 lg:pr-80">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white">
                <UserRound className="h-4 w-4" />
                Profile settings
              </div>
              <h1 className="max-w-2xl text-3xl font-bold tracking-normal text-white sm:text-4xl">
                Manage your donor identity
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Keep your contact, location, blood group, and account status
                updated so donation matching stays accurate.
              </p>
            </div>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-[340px_1fr] lg:p-8">
            <aside className="lg:-mt-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08, type: "spring", stiffness: 140 }}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative bg-gradient-to-br from-red-50 via-white to-slate-50 p-4">
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    className="relative mx-auto aspect-[4/5] w-full max-w-72 overflow-hidden rounded-3xl bg-slate-100 shadow-xl ring-1 ring-slate-200 sm:max-w-80 lg:max-w-none"
                  >
                    <img
                      src={formData?.mainPhotoUrl || "/default-profile.png"}
                      alt="Profile"
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/65 to-transparent p-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge tone="red">{formData?.bloodGroup}</Badge>
                        <Badge tone="green">{formData?.status}</Badge>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="px-5 pb-5 pt-2 text-center">
                  <h2 className="mt-4 text-xl font-bold text-slate-950">
                    {formData?.name || "Donor"}
                  </h2>
                  <p className="mt-1 max-w-full truncate text-sm text-slate-500">
                    {formData?.email || user?.email}
                  </p>

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <Badge tone="blue">{formData?.role}</Badge>
                    <Badge tone="slate">{formData?.districts || "Location"}</Badge>
                  </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                  <div className="rounded-xl bg-red-50 p-3">
                    <p className="text-xs font-bold uppercase text-red-400">
                      Blood
                    </p>
                    <p className="mt-1 text-lg font-black text-red-700">
                      {formData?.bloodGroup || "N/A"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-bold uppercase text-slate-400">
                      Status
                    </p>
                    <p className="mt-1 text-sm font-black capitalize text-slate-900">
                      {formData?.status || "N/A"}
                    </p>
                  </div>
                </div>

                {!isEditing && (
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(true)}
                    className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-600 text-sm font-bold text-white transition hover:bg-red-700"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </motion.button>
                )}
                </div>
              </motion.div>
            </aside>

            <section>
              {!isEditing ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-red-600">
                        Account overview
                      </p>
                      <h2 className="text-2xl font-bold text-slate-950">
                        Personal information
                      </h2>
                    </div>
                    <ShieldCheck className="hidden h-8 w-8 text-emerald-500 sm:block" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <InfoItem icon={UserRound} label="Name" value={formData.name} />
                    <InfoItem icon={Mail} label="Email" value={formData.email} />
                    <InfoItem
                      icon={Droplet}
                      label="Blood group"
                      value={formData.bloodGroup}
                    />
                    <InfoItem
                      icon={MapPin}
                      label="District"
                      value={formData.districts}
                    />
                    <InfoItem
                      icon={MapPin}
                      label="Upazila"
                      value={formData.upazila}
                    />
                    <InfoItem
                      icon={CalendarDays}
                      label="Joined at"
                      value={formData.createdAt}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  onSubmit={handleSubmit}
                >
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-red-600">
                        Edit profile
                      </p>
                      <h2 className="text-2xl font-bold text-slate-950">
                        Update your information
                      </h2>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </motion.button>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <TextInput
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Email"
                      name="email"
                      value={formData.email}
                      readOnly
                    />
                    <TextInput
                      label="Blood Group"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="District"
                      name="districts"
                      value={formData.districts}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Upazila"
                      name="upazila"
                      value={formData.upazila}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Photo URL"
                      name="mainPhotoUrl"
                      value={formData.mainPhotoUrl}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Role"
                      name="role"
                      value={formData.role}
                      readOnly
                    />
                    <SelectInput
                      label="Status"
                      value={formData.status}
                      setValue={(val) =>
                        setFormData({ ...formData, status: val })
                      }
                      options={["active", "inactive", "blocked"]}
                    />
                    <TextInput
                      label="Joined At"
                      name="createdAt"
                      value={formData.createdAt}
                      readOnly
                    />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-red-700"
                    >
                      <Check className="h-4 w-4" />
                      Save Changes
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
