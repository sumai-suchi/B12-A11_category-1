import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const DonnerInfoModal = () => {
  const { user } = useContext(AuthContext);
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
            <label htmlFor="donor-modal" className="btn btn-outline btn-error">
              Cancel
            </label>

            <button className="btn btn-error text-white">
              Confirm & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonnerInfoModal;
