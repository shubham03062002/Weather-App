// Footer.js

import React from "react";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-links">
        <div>
          <a href="https://github.com/shubham03062002?tab=repositories">
            <FaGithub href="#" />
          </a>
        </div>

        <div>
          <a href="mailto:shubhamasawale9@gmail.com">
            <SiGmail />
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit">
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="footer-app-name">
        Weather App {/* Replace with your app name */}
      </div>
      <div className="footer-copyright">
        &copy; {currentYear} Devoloped With ❤️ By Shubham Asawale{" "}
        {/* Update with current year */}
      </div>
    </footer>
  );
};

export default Footer;
