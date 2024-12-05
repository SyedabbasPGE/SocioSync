import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-700 to-slate-900 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-300">
          © 2024 SocioSync. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="#"
            aria-label="Facebook"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Facebook
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Twitter
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Instagram
          </a>
        </div>
        {/* <div className="mt-4 space-x-4">
          <Link
            to="/terms"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Terms and Conditions
          </Link>
          <Link
            to="/privacy"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </Link>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
