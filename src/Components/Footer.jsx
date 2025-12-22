import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-extrabold flex items-center gap-2">
            🩸 BloodCare
          </h2>
          <p className="mt-4 text-red-100 leading-relaxed">
            BloodCare is a trusted platform connecting donors, patients, and
            hospitals to save lives through fast and secure blood donation.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-red-100">
            <li>
              <NavLink to="/" className="hover:text-white">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/donation-requests" className="hover:text-white">
                Donation Requests
              </NavLink>
            </li>
            <li>
              <NavLink to="/search-donors" className="hover:text-white">
                Search Donors
              </NavLink>
            </li>
            <li>
              <NavLink to="/funding" className="hover:text-white">
                Funding
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Support</h3>
          <ul className="space-y-2 text-red-100">
            <li>
              <NavLink to="/contact" className="hover:text-white">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-white">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className="hover:text-white">
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy" className="hover:text-white">
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Emergency Contact</h3>
          <div className="space-y-3 text-red-100">
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> +880 17XX-XXXXXX
            </p>
            <p>Email: support@bloodcare.com</p>

            <div className="flex gap-4 mt-4">
              <a className="hover:text-gray-200 cursor-pointer">
                <FaFacebookF />
              </a>
              <a className="hover:text-gray-200 cursor-pointer">
                <FaTwitter />
              </a>
              <a className="hover:text-gray-200 cursor-pointer">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-red-400 text-center py-4 text-sm text-red-100">
        © {new Date().getFullYear()} BloodCare. All rights reserved.
        <span className="block md:inline"> Saving lives together 🩸</span>
      </div>
    </footer>
  );
};

export default Footer;
