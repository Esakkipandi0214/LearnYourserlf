import React from "react";
import Link from "next/link";
import { FaHome, FaBook } from "react-icons/fa"; // Importing icons from React Icons
import { useRouter } from "next/router";

interface SideProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SideProps> = ({ isOpen }) => {
    const router = useRouter()

    const handleRouteLink = (path:string)=>{
        router.push(`/${path}`)
    }
  return (
    <div className={`fixed z-50 ${ !isOpen && "hidden"} lg:block`}>
      {/* Sidebar Wrapper */}
      <div
        className={`lg:block fixed top-14 left-0 bg-gray-800 text-white ${
          isOpen ? " block": " hidden" } "w-40   lg:w-64 min-h-screen p-6 transition-all z-20 ${
          isOpen ? "left-0" : "-left-64"
        } lg:left-0 lg:relative lg:top-0`}
      >
        <ul className="my-4 flex flex-col gap-2 sm:my-0">
          <li className="flex rounded-lg hover:bg-gray-700 transition-colors  items-center gap-2 p-1 justify-start">
            <FaHome size={20} onClick={()=>handleRouteLink("Courses")} />
              <Link href="/Courses" className={`${isOpen ?"block": "hidden"} lg:block`} legacyBehavior >
                <a className=" flex items-center   ">
                  Home
                </a>
              </Link>
          </li>
          <li className="flex rounded-lg hover:bg-gray-700 transition-colors  items-center gap-2 p-1 justify-start">
            <FaBook size={20} onClick={()=>handleRouteLink("Courses")} />
              <Link href="/Mytest" className={`${isOpen ?"block": "hidden"} lg:block`} legacyBehavior>
                <a className=" flex items-center ">
                My Test
                </a>
              </Link>
          </li>
          {/* Add more links here with icons */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
