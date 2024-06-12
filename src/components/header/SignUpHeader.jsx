import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../utils/constants";
import { PiSignInBold } from "react-icons/pi";

function SignUpHeader() {
  const [tooltipState, setTooltipState] = useState({}); // State to manage tooltip visibility

  let [tooltipId, setTooltipId] = useState(null);
  let [showTooltip, setShowTooltip] = useState(false);

  // Function to handle mouse enter event for a link
  const handleMouseEnter = (id) => {
    setTooltipId(id);
    setShowTooltip(true);
  };

  //   Function to handle mouse leave event for a link
  const handleMouseLeave = (id) => {
    setTooltipId(null);
    // setTimeout(() => {
    //   setShowTooltip(false);
    // }, 500);
  };

  let tooldata = navLinks.find((link) => link.id === tooltipId);
  console.log(tooldata);

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="bg-white w-full h-[60px] flex  items-center justify-center relative px-2">
        <div className="w-[100%] md:w-[95%] lg:w-[90%] xl:w-[80%] h-full flex justify-between items-center">
          <div className="min-w-[10%] ">hello world</div>

          {/* Middle Links (Hidden on small screens) */}
          <div className="hidden lg:flex gap-3 lg:gap-5 h-full justify-start">
            {navLinks.map((link) => (
              <div
                key={link.id}
                className="relative w-full border border-red-500"
              >
                <NavLink
                  to="#"
                  className="font-semibold h-full flex items-center transition-colors duration-300 ease-in-out hover:text-gray-500 text-gray-500 border-b-4 border-transparent hover:border-gray-200"
                  onMouseEnter={() => handleMouseEnter(link.id)}
                  onMouseLeave={() => handleMouseLeave(link.id)}
                >
                  {link.name}
                </NavLink>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="  flex justify-end gap-2 md:gap-3 items-center">
            <div className="flex justify-center gap-1   items-center">
              <button className="w-[120px] font-semibold text-white bg-black hover:bg-[#4cd681]  rounded p-3 flex gap-2 justify-center items-center ">
                <span>
                  <PiSignInBold />
                </span>
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {showTooltip? <div>
        <h2>{tooldata?.title}</h2>
        <p>{tooldata?.statement}</p>
      </div>:null}

    </div>
  );
}

export default SignUpHeader;
