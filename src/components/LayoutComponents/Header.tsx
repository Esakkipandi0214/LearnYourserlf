import React from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";

interface SideProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoggedIn: boolean;
  handleClearCookies: ()=> void;
}

const Header: React.FC<SideProps> = ({ isOpen,isLoggedIn,handleClearCookies, setIsOpen }) => {


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
            <span className="bg-red-600 text-white px-4 py-2 rounded-md transition-colors">
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
