import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
// , Search
import Cookies from "js-cookie";
import { useAppContext } from "../../../Providers/AppContext";
// import { useRouter } from "next/router";
interface SideProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoggedIn: boolean;
}

const Header: React.FC<SideProps> = ({ isOpen,isLoggedIn, setIsOpen }) => {
  const {  isEnglish, toggleLanguage } = useAppContext();




  const handleClearCookies = () => {
    Cookies.remove("auth_token_LearnYourSelf");
    Cookies.remove("userId_LearnYourSelf");
    Cookies.remove("email_LearnYourSelf");
    Cookies.remove("username_LearnYourSelf");
  
    // Ensure cookies are removed before reloading
    setTimeout(() => { // Redirect to home
      window.location.reload();
      window.location.href = "/"; // Reload to clear all stored data
    }, 100);
  };
  

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md fixed w-full z-10 top-0 left-0 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link href="/" legacyBehavior>
          <a className=" flex gap-0.5 justify-start items-center font-semibold"><h1 className=" text-3xl text-[#50E3C2]">Q</h1><h2 className=" text-lg flex ">wizer</h2></a>
        </Link>
      </div>

    {/* <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white ml-2 outline-none placeholder-gray-400"
          /> */}
      <div className="flex gap-4">
      <div className=" flex items-center bg-transparent px-4 py-2 rounded-md">
      <label
        htmlFor="Toggle1"
        className="inline-flex items-center space-x-4 cursor-pointer text-white"
      >
        {/* <span>{isEnglish ? "Eng" : "தமிழ்"}</span> */}
        <span className="relative">
          <input
            id="Toggle1"
            type="checkbox"
            className="hidden peer"
            checked={isEnglish}
            onChange={toggleLanguage}
          />
          <div className="w-14 h-6 relative rounded-full shadow-inner bg-white peer-checked:bg-violet-600">
          <span className={` font-medium absolute top-1 ${ isEnglish?" text-white text-xs pl-1 left-1 ":"text-gray-700 right-1 text-[9px]"} peer-checked:text-white`}>{isEnglish ? "Eng" : "தமிழ்"}</span>
          </div>
          <div className={`absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow ${ isEnglish?" bg-white":"bg-gray-300"} peer-checked:right-0 peer-checked:left-auto`}></div>
        </span>
      </label>
    </div>
        {isLoggedIn ? (
          <button className=" flex items-center" onClick={handleClearCookies}>
            <span className={`bg-red-600 text-white ${ isEnglish?"text-sm sm:text-lg px-2 sm:px-4":" sm:px-2 px-1 text-[9px] sm:text-sm"}  sm:px-4  sm:py-2 py-2  rounded-md transition-colors`}>
              {isEnglish?"Logout":"வெளியேறு"}
            </span>
          </button>
        ) : (
          <Link href="/" legacyBehavior>
            <a className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              { isEnglish?"Login":"உள்நுழைக"}
            </a>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
