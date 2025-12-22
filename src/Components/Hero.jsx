import { NavLink } from "react-router";

const Hero = () => {
  return (
    <div>
      <div className="relative bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b')] bg-cover bg-center opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Donate Blood,
            <span className="block text-red-200">Save Lives Today 🩸</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg md:text-xl text-red-100 leading-relaxed">
            Every drop of blood is a gift of life. Join our community of heroes
            and help patients in urgent need of blood donation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <NavLink
              to="/auth/register"
              className="btn btn-lg bg-white text-red-600 hover:bg-red-100 border-none shadow-lg"
            >
              ❤️ Join as a Donor
            </NavLink>

            <NavLink
              to="/searchDonner"
              className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-red-600 shadow-lg"
            >
              🔍 Search Donors
            </NavLink>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-red-100">
            <span>✔ Trusted by Hospitals</span>
            <span>✔ Verified Donors</span>
            <span>✔ 24/7 Emergency Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
