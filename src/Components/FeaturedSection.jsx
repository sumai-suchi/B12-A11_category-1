import { FaHandHoldingHeart, FaHeartbeat, FaUserShield } from "react-icons/fa";

const FeaturedSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-600">
          Why Choose BloodCare?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg">
          BloodCare connects donors, patients, and hospitals in one trusted
          platform to save lives faster and safer.
        </p>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-base-100 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
            <div className="flex justify-center">
              <FaHeartbeat className="text-5xl text-red-500" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-800">
              Life-Saving Impact
            </h3>
            <p className="mt-3 text-gray-600">
              Every blood donation can save up to three lives. Your single act
              of kindness creates a ripple of hope for families in need.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-base-100 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
            <div className="flex justify-center">
              <FaUserShield className="text-5xl text-red-500" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-800">
              Verified & Trusted
            </h3>
            <p className="mt-3 text-gray-600">
              All donors and requests are verified. We ensure safe, transparent,
              and reliable connections between donors and patients.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-base-100 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
            <div className="flex justify-center">
              <FaHandHoldingHeart className="text-5xl text-red-500" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-800">
              Easy & Compassionate
            </h3>
            <p className="mt-3 text-gray-600">
              Find donors, request blood, or contribute funds—all in just a few
              clicks. Helping others has never been this simple.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
