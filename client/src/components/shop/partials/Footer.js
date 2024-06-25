import React, { Fragment } from "react";
import moment from "moment";
import { FaFacebookF, FaInstagram, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <Fragment>
      <footer
        style={{ background: "#303031", color: "#87898A" }}
        className="py-8 px-4 md:px-12 text-center"
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-lg font-semibold text-white">Contact Us</h2>
            <ul className="list-none mt-2">
              <li className="flex items-center justify-center md:justify-start mb-2">
                <FaEnvelope className="mr-2" /> indiaukfit@gmail.com
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-2" /> Bangalore, India
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0 text-center">
            <h2 className="text-lg font-semibold text-white">Follow Us</h2>
            <p className="mt-2">Stay connected for updates</p>
            <ul className="list-none flex justify-center mt-2 space-x-4">
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100063891679294&mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <FaFacebookF size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_ukfit_?igsh=MTN0dXk4dHFjaWticA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <FaInstagram size={24} />
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <p className="mb-1 text-sm">&copy; {moment().format("YYYY")} UK Fit</p>
            <p className="text-sm">All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
