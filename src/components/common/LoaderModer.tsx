import React from 'react';

export const GlassmorphicLoader = () => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100">
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-md z-10"></div>

      {/* Loader */}
      <div className="absolute animate-spin w-12 h-12 border-4 border-t-4 border-transparent border-t-orange-400 rounded-full z-20"></div>
    </div>
  );
};
