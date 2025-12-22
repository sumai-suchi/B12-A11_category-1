import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import useAxios from "../hooks/useAxios";

const Donate = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const handlePaymentMethod = (e) => {
    e.preventDefault();
    console.log(e.target.amount.value);
    const donateAmount = e.target.amount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;
    const formdata = {
      donateAmount,
      donorEmail,
      donorName,
    };
    axiosInstance
      .post("/create-payment-checkOut", formdata)
      .then((res) => {
        console.log(res.data);
        window.location.href = res.data.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
        <h2 className="text-3xl font-extrabold text-red-600 mb-4">
          Support BloodCare
        </h2>
        <p className="text-gray-600 mb-6">
          Your small donation can make a big difference. Help us save lives
          today.
        </p>

        <div>
          <form
            onSubmit={handlePaymentMethod}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="number"
              name="amount"
              placeholder="Enter amount (BDT)"
              className="input input-bordered w-full sm:flex-1"
            />
            <button
              type="submit"
              className="btn btn-error text-white px-6 py-3 rounded-xl w-full sm:w-auto"
            >
              Donate
            </button>
          </form>
        </div>

        <p className="text-gray-400 mt-4 text-sm">Safe & Secure payment</p>
      </div>
    </section>
  );
};

export default Donate;
