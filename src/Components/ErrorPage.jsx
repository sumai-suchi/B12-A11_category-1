import { FaHeartbeat } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-6 text-center">
      <FaHeartbeat className="text-red-500 text-8xl animate-pulse mb-6" />

      <h1 className="text-7xl md:text-9xl font-extrabold text-red-600 mb-4">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        The page you are looking for doesn’t exist, or may have been removed.
        Let’s get you back to saving lives.
      </p>

      <Link
        to="/"
        className="btn btn-error text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
