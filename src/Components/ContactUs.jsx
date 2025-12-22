import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-red-600">
            Contact Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg">
            Have questions or need urgent help? Reach out to us anytime — we’re
            here to save lives together.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-base-100 rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-4">
              <div>
                <label className="label font-semibold">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label font-semibold">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <button type="button" className="btn btn-error w-full text-white">
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-base-100 rounded-2xl shadow-lg p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Get in Touch
            </h3>

            <div className="space-y-5 text-gray-700">
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-red-500 text-xl" />
                <span className="text-lg font-medium">+880 17XX-XXXXXX</span>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-red-500 text-xl" />
                <span className="text-lg">support@bloodcare.com</span>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-red-500 text-xl" />
                <span className="text-lg">Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-sm text-gray-700">
                🩸 <strong>Emergency?</strong> Call us directly for urgent blood
                requests. We respond faster via phone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
