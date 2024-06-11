import React, { useState } from "react";
import { IoLogoApple } from "react-icons/io5";
import { TfiAndroid } from "react-icons/tfi";
import { SiGlassdoor } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa6";
import { footerCountries } from "../../utils/constants";
function Footer() {
  const [selectedCountry, setSelectedCountry] = useState("India");

  const handleSelectCountry = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <footer className="flex flex-col justify-center items-center bg-white">
      <div className="w-full flex justify-center border-2">
        <div className="w-full md:w-[85%] xl:w-[70%] flex flex-col px-2 py-5 gap-10 ">
          {/* <div className="w-full flex flex-col md:flex-row md:justify-center ">
            <div className="w-[100%] md:w-[20%] ">Lorem ipsum dolor sit amet.</div>
            <div className="w-[100%] md:w-[80%] flex flex-wrap justify-center">
              <div className="w-[50%] md:w-[25%]">
                <p className="font-bold leading-9"> Glassdoor</p>
                <p>About / Press</p>
                <p>Blog</p>
                <p>Grievance Officer</p> <p>India</p>
              </div>
              <div className="w-[50%] md:w-[25%]">
                <p className="font-bold leading-9">Employers</p>
                <p>Get a FREE employers</p>
                <p>Account</p>
                <p>Employer Center</p>
              </div>
              <div className="w-[50%] md:w-[25%]">
                <p className="font-bold leading-9">Information</p>
                <p>Help/Contact Us</p>
                <p>Guide Lines</p>
                <p>Terms of Use</p>
                <p>Privacy & Ad Choices</p>
                <p>Don't Share My Info.</p>
                <p>Cookie Consent Tool</p>
              </div>
              <div className="w-[50%] md:w-[25%]">
                <p className="font-bold leading-9">Work with Us</p>
                <p>Adevertisers</p>
                <p>Careers</p>
              </div>
            </div>
          </div> */}
          <div className="w-full flex flex-col md:flex-row md:justify-center ">
            <div className="w-full md:w-1/5 text-center md:text-left mb-4 md:mb-0">
              Lorem ipsum dolor sit amet.
            </div>
            {/* <div className="w-full md:w-4/5 flex flex-wrap justify-center">
              <div className="w-1/2 md:w-1/4 mb-4  md:text-left">
                <p className="font-bold leading-9">Glassdoor</p>
                <p>About / Press</p>
                <p>Blog</p>
                <p>Grievance Officer</p>
                <p>India</p>
              </div>
              <div className="w-1/2 md:w-1/4 mb-4  md:text-left">
                <p className="font-bold leading-9">Employers</p>
                <p>Get a FREE employer's</p>
                <p>Account</p>
                <p>Employer Center</p>
              </div>
              <div className="w-1/2 md:w-1/4 mb-4  md:text-left">
                <p className="font-bold leading-9">Information</p>
                <p>Help/Contact Us</p>
                <p>Guidelines</p>
                <p>Terms of Use</p>
                <p>Privacy & Ad Choices</p>
                <p>Don't Share My Info</p>
                <p>Cookie Consent Tool</p>
              </div>
              <div className="w-1/2 md:w-1/4 mb-4  md:text-left">
                <p className="font-bold leading-9">Work with Us</p>
                <p>Advertisers</p>
                <p><a href="#">Careers</a></p>
              </div>
            </div> */}
            <div className="w-full md:w-4/5 flex flex-wrap justify-center">
              <div className="w-1/2 md:w-1/4 mb-4 md:mb-0 md:text-left">
                <p className="font-bold leading-9">Glassdoor</p>
                <p>
                  <a href="#" className="hover:underline">
                    About / Press
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline">
                    Grievance Officer
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline">
                    India
                  </a>
                </p>
              </div>
              <div className="w-1/2 md:w-1/4 mb-4 md:mb-0 md:text-left">
                <p className="font-bold leading-9">Employers</p>
                <p>
                  <a href="#" className="hover:underline">
                    Get a FREE employer's
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline">
                    Account
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline">
                    Employer Center
                  </a>
                </p>
              </div>
              <div className="w-1/2 md:w-1/4 mb-4 md:mb-0 md:text-left">
                <p className="font-bold leading-9">Information</p>
                <p>
                  <a href="#" className="hover:underline">
                    Help/Contact Us
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline">
                    Guidelines
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline">
                    Terms of Use
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline">
                    Privacy & Ad Choices
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline">
                    Don't Share My Info
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline">
                    Cookie Consent Tool
                  </a>
                </p>
              </div>
              <div className="w-1/2 md:w-1/4 mb-4 md:mb-0 md:text-left">
                <p className="font-bold leading-9">Work with Us</p>
                <p>
                  <a href="#" className="hover:underline">
                    Advertisers
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="flex-col justify-center w-full  md:flex-row  flex md:justify-between  items-center gap-3">
            <div className="flex items-center justify-center gap-2 md:gap-5  md:w-[33%] ">
              <div className="text-sm lg:text-lg">Download the App</div>
              <div className="flex text-2xl gap-2 xl:gap-5">
                <span className="hover:text-green-500">
                  <TfiAndroid />
                </span>{" "}
                <span className="hover:text-gray-500">
                  <IoLogoApple />
                </span>
              </div>
            </div>
            <div className=" md:w-[42%] flex justify-center gap-3">
              <div className="p-2 text-xl border border-black rounded-full hover:text-white hover:bg-green-500">
                <SiGlassdoor />
              </div>
              <div className="p-2 text-xl border border-black rounded-full hover:text-white hover:bg-blue-500">
                <FaFacebookF />
              </div>
              <div className="p-2 text-xl border border-black rounded-full hover:text-white hover:bg-blue-500">
                <FaXTwitter />
              </div>
              <div className="p-2 text-xl border border-black rounded-full hover:text-white hover:bg-red-500">
                <FaYoutube />
              </div>
              <div className="p-2 text-xl border border-black rounded-full hover:text-white hover:bg-pink-500">
                <FaInstagram />
              </div>
              <div className="p-2 text-xl border border-black rounded-full hover:text-white hover:bg-black">
                <FaTiktok />
              </div>
            </div>
            <div className="w-[50%] md:w-[25%]">
              <select
                id="country"
                name="country"
                value={selectedCountry}
                onChange={handleSelectCountry}
                className="block w-full p-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              >
                {footerCountries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3  text-center w-[100%] md:w-[70%] py-5 px-2">
        <p className="text-sm md:text-md lg:text-lg">
          Browse by: Companies Jobs Locations Communities
        </p>
        <p className="text-sm md:text-md lg:text-lg">
          Copyright © 2008-2024, Glassdoor LLC. "Glassdoor" and logo are
          registered trademarks of Glassdoor LLC
        </p>
      </div>
    </footer>
  );
}

export default Footer;
