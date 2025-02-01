import React from 'react';
import { RotatingLines } from "react-loader-spinner";

export const GlassmorphicLoader = () => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100">
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 z-40 bg-black/45 bg-opacity-20 backdrop-blur-md "></div>

      {/* Loader */}
      <div className="flex absolute z-50 items-center justify-center h-[calc(100vh-6rem)]">
      <div className="flex space-x-2">
        <RotatingLines
              strokeColor="#578E7E"
              strokeWidth="5"
              animationDuration="1"
              width="96"
              visible={true}
            />
      </div>
    </div>
    </div>
  );
};
