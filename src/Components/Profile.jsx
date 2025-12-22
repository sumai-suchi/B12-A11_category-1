import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../AuthContext/AuthContext";

const Profile = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  //   const [userProfile, setUserProfile] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(id);
  console.log(formData);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/user/role/${user?.email}`);
      //   setUserProfile(res.data);

      setFormData({
        _id: res.data._id || "",
        name: res.data.name || "",
        email: res.data.email,
        mainPhotoUrl: res.data.mainPhotoUrl || "",
        bloodGroup: res.data.bloodGroup || "",
        districts: res.data.districts || "",
        upazila: res.data.upazila || "",
        role: res.data.role || "",
        status: res.data.status || "",
        createdAt: res.data.createdAt || "",
      });
    };
    fetchData();
  }, [axiosSecure, id, user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axiosSecure.patch(
        `/update/singleUser?email=${user?.email}`,
        formData
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-bold text-red-600">My Profile</h1>

          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-sm btn-outline btn-error"
          >
            ✏️ Edit Profile
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 p-6">
          <img
            src={formData?.mainPhotoUrl}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-red-300 object-cover"
          />

          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">{formData?.name}</h2>
            <p className="text-gray-500">{formData?.email}</p>

            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              <span className="badge badge-error">{formData?.bloodGroup}</span>
              <span className="badge badge-info">{formData?.role}</span>
              <span className="badge badge-success">{formData?.status}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="label font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                disabled
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="label font-semibold">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                value={formData?.bloodGroup}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">District</label>
              <input
                type="text"
                name="districts"
                value={formData?.districts}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">PhotoUrl</label>
              <input
                type="text"
                name="mainPhotoUrl"
                value={formData?.mainPhotoUrl}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">Upazila</label>
              <input
                type="text"
                name="upazila"
                value={formData?.upazila}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">Role</label>
              <input
                type="text"
                value={formData?.role}
                name="role"
                onChange={handleChange}
                disabled={formData?.role == "admin" && !isEditing}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="label font-semibold">Account Status</label>
              <input
                type="text"
                value={formData?.status}
                name="status"
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="label font-semibold">Joined At</label>
              <input
                type="text"
                value={formData?.createdAt}
                onChange={handleChange}
                name="createdAt"
                disabled={!isEditing}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <button type="submit" className="btn btn-sm btn-outline btn-error">
              Save
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-red-50 p-4 text-center text-sm text-gray-600">
          BloodCare © 2025 — Saving lives together 🩸
        </div>
      </div>
    </div>
  );
};

export default Profile;
