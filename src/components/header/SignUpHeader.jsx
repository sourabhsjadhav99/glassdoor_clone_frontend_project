import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../utils/constants";
import { PiSignInBold } from "react-icons/pi";

import Img from "../Img";
import logo from "../../assets/Glassdoor_logo.svg";
import PopupSignUpForm from "../forms/PopupSignUpForm";


function SignUpHeader() {
  const [tooltipId, setTooltipId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle mouse enter and leave events
  const handleMouseEnter = (id) => {
    setTooltipId(id);
  };

  const handleMouseLeave = (id) => {
    setTooltipId(id);
  };

  let tooldata = navLinks.find((link) => link.id === tooltipId);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative border-b-2">
      <nav className="bg-white w-full h-[60px] flex  items-center justify-center relative px-2">
        <div className="w-[100%] md:w-[95%] lg:w-[90%] xl:w-[80%] h-full flex justify-between items-center">
          <div className="min-w-[10%] h-[50px] ">
            <Img src={logo} className="h-[40px]"/>
          </div>

          {/* Middle Links (Hidden on small screens) */}
          <div
            className="hidden lg:flex gap-3 lg:gap-5 h-full justify-start "
            onMouseLeave={() => handleMouseLeave()}
          >
            {navLinks.map((link) => (
              <div key={link.id} className="relative w-full ">
                <NavLink
                  to="#"
                  className="font-semibold h-full flex items-center transition-colors duration-300 ease-in-out hover:text-gray-500 text-gray-500 border-b-4 border-transparent hover:border-gray-200"
                  onMouseEnter={() => handleMouseEnter(link.id)}
                >
                  {link.name}
                </NavLink>
              </div>
            ))}
            {tooldata && (
              <div
                className={`absolute w-[60%] mx-[20%] xl:w-[40%] xl:mx-[30%] h-[300px] left-0 top-full p-5 border-2 bg-white rounded-md shadow-md flex  items-start justify-between  z-50`}
                onMouseLeave={() => handleMouseLeave()}
              >
                <div className="w-[50%] h-full flex flex-col gap-5">
                  <h1 className="text-lg font-semibold"> {tooldata?.title}</h1>
                  <p>{tooldata?.statement}</p>
                  <button
                    className="w-[120px] font-semibold text-white bg-black hover:bg-[#4cd681]  rounded p-3 flex gap-2 justify-center items-center "
                    onClick={handleOpenModal}
                  >
                    <span>
                      <PiSignInBold />
                    </span>
                    <span>Sign In</span>
                  </button>
                </div>
                <div className="w-[50%] h-full">
                  <Img src={tooldata?.image}  className="w-full h-full"/>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="  flex justify-end gap-2 md:gap-3 items-center">
            <div className="flex justify-center gap-1   items-center">
              <button
                className="w-[120px] font-semibold text-white bg-black hover:bg-[#4cd681]  rounded p-3 flex gap-2 justify-center items-center "
                onClick={handleOpenModal}
              >
                <span>
                  <PiSignInBold />
                </span>
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <PopupSignUpForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default SignUpHeader;
