import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authToken = Cookies.get("auth_token_LearnYourSelf");
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleClearCookies = () => {
    Cookies.remove("auth_token_LearnYourSelf"); // Store the JWT token itself
    Cookies.remove("userId_LearnYourSelf"); // Store user ID
    Cookies.remove("email_LearnYourSelf"); // Store email
    Cookies.remove("username_LearnYourSelf"); // Store username
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E2E0C8]">
      <Header
        setIsOpen={setIsOpen}
        handleClearCookies={handleClearCookies}
        isLoggedIn={isLoggedIn}
        isOpen={isOpen}
      />
      <div className="flex flex-1 pt-16 overflow-y-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} />
        {/* Main Content */}
        {/* Main Content */}
        <main className="flex-1 p-2 lg:p-4 bg-[#E2E0C8] mt-2 lg:ml-48 overflow-hidden">
          <div className="w-full h-full overflow-y-auto overflow-x-hidden rounded-lg lg:rounded-2xl border border-transparent p-2 lg:p-4 bg-white flex flex-col">
            <div className="flex-1 h-full overflow-y-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
