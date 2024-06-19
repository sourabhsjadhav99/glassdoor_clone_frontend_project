import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../../utils/constants";
import { IoSearchOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMenu, IoClose, IoLocationOutline } from "react-icons/io5";
import logo from "../../assets/Glassdoor_logo.svg";
import Img from "../Img";
import { PiSignInBold } from "react-icons/pi";
import PopupSignUpForm from "../forms/PopupSignUpForm";
import useClickOutside from "../../hooks/useClickOutside";
import { useFirebase } from "../../FirebaseProvider";

function Header() {
  const [isOpenNavLinks, setIsOpenNavLinks] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [tooltipId, setTooltipId] = useState(null);
  const [isSignPopupOpen, setIsSignPopupOpen] = useState(false);
  let { logOut, isLoggedIn, userEmail } = useFirebase();

  let navigate = useNavigate();

  const handleMouse = (id) => {
    setTooltipId(id);
  };

  let tooldata = navLinks.find((link) => link.id === tooltipId);

  const handleModal = () => {
    setIsSignPopupOpen(!isSignPopupOpen);
  };

  const toggleNavLinks = () => {
    setIsOpenNavLinks(!isOpenNavLinks);
  };


  const toggleForm = () => {
    setIsOpenForm(!isOpenForm);
    setShowSearch(!showSearch);
  };

  const toggleUser = () => {
    setIsOpenUser(!isOpenUser);
  };

  const userRef = useRef(null);
  const searchBarRef = useRef(null);

  useClickOutside(userRef, () => setIsOpenUser(false));
  useClickOutside(searchBarRef, () => setShowSearch(false));

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search operation based on company and location
    console.log("Searching for:", { company, location });
    // You can add your search logic here
  };
  
  return (
    <div className="relative border-b">
      <nav className="bg-white w-full h-[60px] flex items-center justify-center relative px-2">
        <div className="w-[100%] md:w-[95%] lg:w-[90%] xl:w-[80%] h-full flex justify-between items-center">
          <div className="min-w-[10%] h-[50px] ">
            <Img src={logo} className="h-[40px]" />
          </div>

          {/* Middle Links (Hidden on small screens) */}
          <div
            onMouseLeave={() => handleMouse()}
            className="min-w-[30%]  hidden lg:flex gap-3 lg:gap-5 h-full justify-start"
          >
            {navLinks.map((link) => {
              return (
                <NavLink
                  to={link.path}
                  key={link.id}
                  className={({ isActive }) =>
                    `font-semibold h-full flex items-center transition-colors duration-300 ease-in-out hover:text-gray-500 ${
                      isActive
                        ? "text-[#4cd681] border-b-4 border-[#4cd681] font-bold"
                        : "text-gray-500 border-b-4 border-transparent hover:border-gray-200"
                    }`
                  }
                  onMouseEnter={() => handleMouse(link.id)}
                >
                  {link.name}
                </NavLink>
              );
            })}
            {tooldata && (
              <div
                className={`absolute w-[60%] mx-[20%] xl:w-[40%] xl:mx-[30%] h-[300px] left-0 top-full p-5 border-2 bg-white rounded-md shadow-md flex  items-start justify-between  z-50`}
                onMouseLeave={() => handleMouse()}
              >
                <div className="w-[50%] h-full flex flex-col gap-5">
                  <h1 className="text-lg font-semibold"> {tooldata?.title}</h1>
                  <p>{tooldata?.statement}</p>
                  {!isLoggedIn && (
                    <button
                      className="w-[140px] font-semibold text-white bg-black hover:bg-[#4cd681]  rounded p-2 flex gap-2 justify-center items-center "
                      onClick={() => {
                        handleModal();
                        handleMouse();
                      }}
                    >
                      <span>
                        <PiSignInBold />
                      </span>
                      <span>Sign In</span>
                    </button>
                  )}
                </div>
                <div className="w-[50%] h-full">
                  <Img src={tooldata?.image} className="w-full h-full" />
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div
            className=" flex justify-end gap-2 md:gap-3 items-center"
            ref={searchBarRef}
          >
            {showSearch ? (
              <form
                className="gap-1 items-center hidden lg:flex"
                onSubmit={handleSearch}
              >
                <div className="flex w-[60%]  rounded-l-full bg-gray-100 items-center  p-2 gap-2">
                  <span>
                    <IoSearchOutline />
                  </span>
                  <input
                    type="text"
                    placeholder="Company"
                    className="outline-none text-md   bg-gray-100 w-full h-full "
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="w-[40%] flex rounded-r-full bg-gray-100 items-center  p-2 gap-2">
                  <span>
                    <IoLocationOutline />
                  </span>
                  <input
                    type="text"
                    placeholder="Location"
                    className="outline-none text-md   bg-gray-100 w-full h-full"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </form>
            ) : null}
            <div className="flex justify-center gap-1    items-center">
              {!showSearch && (
                <button
                  className={`font-semibold flex gap-2 items-center hover:font-bold hover:bg-gray-200 hover:text-[#4cd681] rounded-full py-2 px-3 `}
                  onClick={() => {
                    setShowSearch(!showSearch);
                    toggleForm();
                  }}
                >
                  <span>
                    <IoSearchOutline />
                  </span>
                  <span className="hidden md:block">Search</span>
                </button>
              )}

              <button className=" font-semibold hover:bg-gray-200 hover:text-[#4cd681] hover:font-bold rounded-full p-3  ">
                <FiBell />
              </button>
              <button
                className=" font-semibold hover:bg-gray-200 hover:text-[#4cd681] hover:font-bold rounded-full p-3  "
                onClick={() => toggleUser()}
              >
                <FaRegCircleUser />
              </button>
              {/* Hamburger Menu Button (Visible on small screens) */}
              <button className="lg:hidden block" onClick={toggleNavLinks}>
                <IoMenu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed flex flex-col w-full inset-0 bg-white text-gray-700 z-50 transform transition-transform duration-500 ease-in-out p-5 ${
            isOpenNavLinks ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button className="text-xl self-end mb-4" onClick={toggleNavLinks}>
            <IoClose />
          </button>
          <div className="flex flex-col items-start space-y-4 py-4 w-full">
            {navLinks.map((link) => (
              <div key={link.id} className="w-full border-b border-gray-300">
                <NavLink
                  to={link.path}
                  onClick={toggleNavLinks}
                  className={({ isActive }) =>
                    `font-semibold flex items-center px-3 py-2 transition-colors duration-300 ease-in-out hover:text-gray-500 ${
                      isActive
                        ? "text-[#4cd681] font-bold"
                        : "text-gray-500 hover:text-gray-700"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`fixed  flex flex-col lg:hidden w-full inset-0 bg-white text-gray-700 z-50 transform transition-transform duration-500 ease-in-out p-5 ${
            isOpenForm ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button className="text-xl self-end mb-4" onClick={toggleForm}>
            <IoClose />
          </button>
          <div className="p-5 w-full">
            <form
              className="gap-3 items-center lg:hidden flex flex-col"
              onSubmit={handleSearch}
            >
              <div className="flex w-[100%]  rounded-full bg-gray-100 items-center  p-2 gap-2">
                <span>
                  <IoSearchOutline />
                </span>
                <input
                  type="text"
                  placeholder="Company"
                  className="outline-none text-md   bg-gray-100 w-full h-full "
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="flex w-[100%]  rounded-full bg-gray-100 items-center  p-2 gap-2">
                <span>
                  <IoLocationOutline />
                </span>
                <input
                  type="text"
                  placeholder="Location"
                  className="outline-none text-md   bg-gray-100 w-full h-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>

        <div
          className={`z-50 flex-col  items-center  top-[60px] fixed  right-0 w-[250px] border-gray-300  bg-white border-l-2 border-b-2 z-100 hidden transition-transform duration-500 py-5 rounded-b-md ${
            isOpenUser ? "open " : ""
          } ${!isLoggedIn ? "h-[150px] gap-5" : "h-[300px] gap-1"}`}
          ref={userRef}
        >
          <button
            className="w-[100%] text-xl flex justify-end px-5"
            onClick={() => toggleUser()}
          >
            <span>
              <IoClose />
            </span>
          </button>
          {isLoggedIn && (
            <div className="w-full">
              <div className="w-[100%] text-xl flex items-center gap-2 px-5">
                <FaRegCircleUser />
                <small className="truncate whitespace-nowrap overflow-hidden font-semibold">{userEmail}</small>
              </div>
              <div className="p-4 w-full flex flex-col items-start gap-1">
                <button
                  className="p-2 w-full text-left hover:bg-gray-100"
                  onClick={() => {
                    navigate("/profile");
                    toggleUser();
                  }}
                >
                  User Details
                </button>
                <button
                  className="p-2 w-full text-left hover:bg-gray-100"
                  onClick={() => {
                    navigate("/savedjobs");
                    toggleUser();
                  }}
                >
                  Saved Jobs
                </button>
                <button
                  className="p-2 w-full text-left hover:bg-gray-100"
                  onClick={() => {
                    navigate("/appliedjobs");
                    toggleUser();
                  }}
                >
                  Applied Jobs
                </button>
              </div>
            </div>
          )}
          {isLoggedIn ? (
            <button
              className="w-[140px] font-semibold text-white bg-black hover:bg-red-600  rounded p-2 flex gap-2 justify-center items-center "
              onClick={() => {
                logOut();
                toggleUser()
              }}
            >
              <span>Sign Out</span>
              <span>
                <PiSignInBold />
              </span>
            </button>
          ) : (
            <button
              className="w-[140px] font-semibold text-white bg-black hover:bg-[#4cd681]  rounded p-2 flex gap-2 justify-center items-center "
              onClick={() => {
                handleModal();
                handleMouse();
                toggleUser();
              }}
            >
              <span>
                <PiSignInBold />
              </span>
              <span>Sign In</span>
            </button>
          )}
        </div>
      </nav>
      <PopupSignUpForm isOpen={isSignPopupOpen} onClose={handleModal} />
    </div>
  );
}

export default Header;
