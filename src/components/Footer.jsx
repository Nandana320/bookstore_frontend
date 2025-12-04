import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#0c0e17] text-white py-10 px-8 md:px-20">
      <div className="grid md:grid-cols-3 gap-10">
        {/* About Us */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">About Us</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
            dolorem veniam deserunt quisquam eius ad hic maxime dicta ipsum nemo
            itaque necessitatibus quas nobis, illum voluptate, pariatur
            recusandae alias harum!
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Newsletter</h3>
          <p className="text-gray-300 text-sm mb-4">
            Stay updated with our latest trends
          </p>
          <form className="flex w-full max-w-sm">
            <input
              type="email"
              placeholder="Email ID"
              className="flex-grow px-3 py-2 text-black bg-white rounded-l-md outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-black px-4 py-2 font-semibold rounded-r-md hover:bg-yellow-400 transition"
            >
              →
            </button>
          </form>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Follow Us</h3>
          <p className="text-gray-300 text-sm mb-3">Let us be social</p>
          <div className="flex space-x-4 text-gray-300 text-lg">
            <a href="#" className="hover:text-yellow-500 transition">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="hover:text-yellow-500 transition">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="hover:text-yellow-500 transition">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="#" className="hover:text-yellow-500 transition">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-xs">
        Copyright © 2025 All rights reserved | This website is made with ❤ by{" "}
        <span className="text-yellow-500">Luminar Technolab</span>
      </div>
    </footer>
  );
};

export default Footer;