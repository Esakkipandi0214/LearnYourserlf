import React from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import Cookies from "js-cookie";
// import { useRouter } from "next/router";
interface SideProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoggedIn: boolean;
}

const Header: React.FC<SideProps> = ({ isOpen,isLoggedIn, setIsOpen }) => {
  // const router = useRouter()

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
          <a className="text-lg font-semibold">Logo</a>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="hidden lg:flex items-center bg-gray-700 px-4 py-2 rounded-md">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white ml-2 outline-none placeholder-gray-400"
          />
        </div>
        {isLoggedIn ? (
          <button onClick={handleClearCookies}>
            <span className="bg-red-600 text-white text-sm sm:text-lg  sm:px-4  sm:py-2 py-2 px-2 rounded-md transition-colors">
              Logout
            </span>
          </button>
        ) : (
          <Link href="/" legacyBehavior>
            <a className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Login
            </a>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
