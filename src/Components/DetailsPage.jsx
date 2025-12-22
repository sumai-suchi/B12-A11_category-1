import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import DonnerInfoModal from "./DonnerInfoModal";

const DetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [SingleData, setSingleData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/userRequest/${id}`);
      setSingleData(res.data);
    };
    fetchData();
  }, [axiosSecure, id]);

  console.log(SingleData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-red-600">
            Blood Donation Request Details
          </h1>
          <p className="text-gray-500 mt-2">
            Please review the request information carefully
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <span className="badge badge-warning badge-lg">
            ⏳ {SingleData?.donationStatus}
          </span>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Requester Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Requester Name</p>
              <p className="font-medium">{SingleData?.requesterName}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Requester Email</p>
              <p className="font-medium">{SingleData?.requesterEmail}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recipient Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Recipient Name</p>
              <p className="font-medium">{SingleData?.recipientName}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Blood Group</p>
              <p className="font-medium text-red-600">
                {SingleData?.bloodGroup}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">District</p>
              <p className="font-medium">{SingleData?.district}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Upazila</p>
              <p className="font-medium">{SingleData?.upazila}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Donation Location
          </h2>

          <div className="grid gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Hospital Name</p>
              <p className="font-medium">{SingleData?.hospitalName}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Full Address</p>
              <p className="font-medium">{SingleData?.address}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Donation Schedule
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Donation Date</p>
              <p className="font-medium">{SingleData?.donationDate}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Donation Time</p>
              <p className="font-medium">{SingleData?.donationTime}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Request Message
          </h2>

          <div className="bg-red-50 border mb-8 border-red-200 p-5 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              {SingleData?.requestMessage}
            </p>
          </div>

          <DonnerInfoModal SingleData={SingleData}></DonnerInfoModal>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
