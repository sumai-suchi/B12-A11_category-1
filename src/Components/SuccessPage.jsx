const SuccessPage = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-green-700 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your generosity. Your donation has been processed
            successfully.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="w-full py-2 rounded-lg border border-green-600 text-green-600 font-semibold hover:bg-green-50 transition"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
