import React from "react";
import Link from "next/link";
import { FaHome, FaBook } from "react-icons/fa"; // Importing icons from React Icons
import { useRouter } from "next/router";
import { useAppContext } from "../../../Providers/AppContext";



interface SideProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SideProps> = ({ isOpen }) => {
    const router = useRouter()
      const {  isEnglish } = useAppContext();
    
     
  

    const handleRouteLink = (path:string)=>{
        router.push(`/${path}`)
    }
  return (
    <div className={`fixed z-50 h-full ${ !isOpen && "hidden"} lg:block`}>
      {/* Sidebar Wrapper */}
      <div
        className={`lg:block fixed top-20  transition-all duration-600 ease-linear z-20  rounded-3xl h-[85%]   bg-gray-800 text-white ${
          isOpen ? " block": " hidden" } " w-40   ${ isEnglish?"lg:w-40":" lg:w-48"}  p-6  z-20 ${
          isOpen ? "left-4" : "-left-64"
        } ${ isEnglish?"lg:left-7":" lg:left-2"} lg:relative lg:top-10`}
      >
        <ul className="my-4 flex flex-col gap-2 sm:my-0">
          <li className="flex rounded-lg hover:bg-gray-700 transition-colors  items-center gap-2 p-1 justify-start">
            <FaHome size={20} onClick={()=>handleRouteLink("Courses")} />
              <Link href="/dashboard" className={`${isOpen ?"block": "hidden"} lg:block`} legacyBehavior >
                <a className=" flex items-center   ">
              { isEnglish ? "Dashboard" : "டாஷ்போர்டு"}
                </a>
              </Link>
          </li>
          <li className="flex rounded-lg hover:bg-gray-700 transition-colors  items-center gap-2 p-1 justify-start">
            <FaBook size={20} onClick={()=>handleRouteLink("Courses")} />
              <Link href="/Mytest" className={`${isOpen ?"block": "hidden"} lg:block`} legacyBehavior>
                <a className=" flex items-center ">
                {isEnglish?"My Test":"என் தேர்வு"}
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
