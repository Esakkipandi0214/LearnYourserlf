import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true);
    
  return (
    <div className="flex flex-col min-h-screen">
      <Header setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="flex flex-1 pt-16 overflow-y-hidden">
        {/* Sidebar */}
        <Sidebar  isOpen={isOpen} />
        {/* Main Content */}
        <main className={`flex-1  lg:p-3 p-1  bg-[#E2E0C8] overflow-y-hidden  ${ isOpen?" ml-36":" ml-0"} mt-2 lg:ml-64`}> 
            <div className=" w-full h-full rounded-lg lg:rounded-2xl border border-transparent p-1 lg:p-4 bg-white">
          {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
