import  { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../utils/constants";
import { IoSearchOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMenu, IoClose, IoLocationOutline  } from "react-icons/io5";


function Header() {
  const [isOpenNavLinks, setIsOpenNavLinks] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  const handleLinkClick = () => {
    setIsOpenNavLinks(false);
  };

  const toggleNavLinks = () => {
    console.log("hii nav");
    setIsOpenNavLinks(!isOpenNavLinks);
  };
  const toggleForm = () => {
    console.log("hii form");
    setIsOpenForm(!isOpenForm);
    setShowSearch(!showSearch);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search operation based on company and location
    console.log("Searching for:", { company, location });
    // You can add your search logic here
  };
  return (
    <nav className="bg-white w-full h-[60px] flex items-center justify-center relative px-2">
      <div className="w-[100%] md:w-[95%] lg:w-[90%] xl:w-[80%] h-full flex justify-between items-center">
        <div className="min-w-[10%] ">hello world</div>

        {/* Middle Links (Hidden on small screens) */}
        <div className="min-w-[30%]  hidden lg:flex gap-3 lg:gap-5 h-full justify-start">
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
              >
                {link.name}
              </NavLink>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="min-w-[45%]  flex justify-end gap-2 md:gap-3 items-center">
          {showSearch ? (
            <form
              className="gap-1 items-center hidden lg:flex"
              onSubmit={handleSearch}
            >
              <div className="flex w-[60%]  rounded-l-full bg-gray-100 items-center  p-2 gap-2">
                <span><IoSearchOutline/></span>
                <input
                  type="text"
                  placeholder="Company"
                  className="outline-none text-md   bg-gray-100 w-full h-full "
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="w-[40%] flex rounded-r-full bg-gray-100 items-center  p-2 gap-2">
                <span><IoLocationOutline /></span>
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
            <button className=" font-semibold hover:bg-gray-200 hover:text-[#4cd681] hover:font-bold rounded-full p-3  ">
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
                onClick={handleLinkClick}
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
                <span><IoSearchOutline/></span>
                <input
                  type="text"
                  placeholder="Company"
                  className="outline-none text-md   bg-gray-100 w-full h-full "
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="flex w-[100%]  rounded-full bg-gray-100 items-center  p-2 gap-2">
                <span><IoLocationOutline /></span>
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
    </nav>
  );
}

export default Header;
