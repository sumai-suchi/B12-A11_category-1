import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";

const RequestDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(id);
  console.log(formData);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/userRequest/${id}`);

      setFormData({
        requesterName: res.data.requesterName || "",
        requesterEmail: res.data.requesterEmail || "",
        recipientName: res.data.recipientName || "",
        district: res.data.district || "",
        upazila: res.data.upazila || "",
        hospitalName: res.data.hospitalName || "",
        address: res.data.address || "",
        bloodGroup: res.data.bloodGroup || "",
        donationDate: res.data.donationDate || "",
        donationTime: res.data.donationTime || "",
        requestMessage: res.data.requestMessage || "",
        createdAt: res.data.createdAt || "",

        donationStatus: res.data.donationStatus || "pending",
      });
    };
    fetchData();
  }, [axiosSecure, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axiosSecure.patch(
        `/update/singleUserRequest/${id}`,
        formData
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full lg:h-screen  bg-linear-to-r from-red-700/80 to-black/30 px-3">
      <form className="max-w-4xl mx-auto py-10" onSubmit={handleSubmit}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-6">
              Edit Donation Request
            </h2>

            <div className="space-y-4 ">
              <div className="flex flex-col lg:flex-row gap-1.5">
                <div className="form-control">
                  <label className="label font-semibold">requesterName</label>
                  <input
                    type="text"
                    name="requesterName"
                    placeholder="Enter requesterName"
                    value={formData?.requesterName}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-semibold">requesterEmail </label>
                  <input
                    type="text"
                    name="requesterEmail"
                    placeholder="Enter requester email"
                    onChange={handleChange}
                    value={formData?.requesterEmail}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-semibold">Blood Group</label>
                  <select
                    className="select select-bordered"
                    name="bloodGroup"
                    onChange={handleChange}
                    value={formData?.bloodGroup}
                  >
                    <option disabled>Select blood group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-3">
                <div className="form-control">
                  <label className="label font-semibold">RecipientName</label>
                  <input
                    type="text"
                    name="recipientName"
                    placeholder="Enter district"
                    onChange={handleChange}
                    value={formData?.recipientName}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-semibold">District</label>
                  <input
                    type="text"
                    name="district"
                    onChange={handleChange}
                    value={formData?.district}
                    placeholder="Enter district"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-semibold">Upazila</label>
                  <input
                    type="text"
                    name="upazila"
                    onChange={handleChange}
                    value={formData?.upazila}
                    placeholder="Enter upazila"
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="form-control">
                  <label className="label font-semibold">Hospital</label>
                  <input
                    type="text"
                    name="hospitalName"
                    placeholder="Enter Hospital name"
                    onChange={handleChange}
                    value={formData?.hospitalName}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-semibold">address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    onChange={handleChange}
                    value={formData?.address}
                    className="input input-bordered"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="form-control">
                  <label className="label font-semibold">Donation Date</label>
                  <input
                    type="date"
                    onChange={handleChange}
                    name="donationDate"
                    value={formData?.donationDate}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-semibold">Donation Time</label>
                  <input
                    type="time"
                    onChange={handleChange}
                    name="donationTime"
                    value={formData?.donationTime}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control md:col-span-2">
                  <label className="label font-semibold">Donation Status</label>
                  <select
                    className="select select-bordered"
                    name="donationStatus"
                    value={formData?.donationStatus}
                    onChange={handleChange}
                  >
                    <option>pending</option>
                    <option>inprogress</option>
                    <option>done</option>
                    <option>cancel</option>
                  </select>
                </div>
              </div>
            </div>

            <label className="label">
              <span className="label-text text-black font-medium">
                Request Message
              </span>
            </label>
            <textarea
              name="requestMessage"
              value={formData.requestMessage}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Explain why blood is needed in detail..."
              className="textarea textarea-bordered w-full 
                       
                         text-black bg-white
                         border-gray-600 
                         focus:border-red-500"
            />

            <div className="flex flex-wrap justify-end gap-4 mt-8">
              <button type="submit" className="btn  btn-error">
                Update Donation Request
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestDetailsPage;
