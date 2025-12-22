import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DonnerInfoModal = ({ SingleData }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleStatus = async (_id, donationStatus) => {
    console.log(donationStatus);
    console.log(_id);

    try {
      const res = await axiosSecure.patch(
        `/update/userRequest/status?id=${_id}&donationStatus=${donationStatus}`
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <label htmlFor="donor-modal" className="btn btn-error">
        Donate Blood
      </label>

      <input type="checkbox" id="donor-modal" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box rounded-2xl">
          <h3 className="font-bold text-xl text-red-600 text-center">
            Donor Information 🩸
          </h3>

          <p className="text-center text-gray-500 mt-2">
            Please confirm your information before proceeding
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label className="label font-semibold">Donor Name</label>
              <input
                type="text"
                value={user?.displayName || "John Doe"}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="label font-semibold">Donor Email</label>
              <input
                type="email"
                value={user?.email || "john@example.com"}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>
          </form>

          <div className="modal-action justify-between mt-6">
            {/* <label htmlFor="donor-modal" className="btn btn-outline btn-error">
              Cancel
            </label> */}

            <label
              className="btn  btn-error text-white "
              htmlFor="donor-modal"
              onClick={() => handleStatus(SingleData?._id, "inprogress")}
            >
              Confirm & Continue
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonnerInfoModal;
