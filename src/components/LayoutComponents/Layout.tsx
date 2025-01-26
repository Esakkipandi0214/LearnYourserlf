import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/router";


const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter()

    useEffect(()=>{
    const authToken = Cookies.get("auth_token_LearnYourSelf"); 
    if(authToken){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])

  const handleClearCookies =()=>{
    Cookies.remove('auth_token_LearnYourSelf');  // Store the JWT token itself
    Cookies.remove('userId_LearnYourSelf');  // Store user ID
    Cookies.remove('email_LearnYourSelf');  // Store email
    Cookies.remove('username_LearnYourSelf');  // Store username
    router.push("/")
  }
    
  return (
    <div className="flex flex-col min-h-screen">
      <Header setIsOpen={setIsOpen} handleClearCookies={handleClearCookies} isLoggedIn={isLoggedIn} isOpen={isOpen} />
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
