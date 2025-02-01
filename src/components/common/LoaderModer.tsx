import React from 'react';

export const GlassmorphicLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-screen bg-gray-100">
      {[1, 2, 3, 4, 5, 6].map((number, index) => (
        <div key={index} className="flex justify-center p-4">
          <div className="px-4 rounded-lg shadow-md w-72 sm:w-96 animate-pulse bg-white/40 backdrop-blur-xl border border-white/50">
            {/* Profile Section */}
            <div className="flex items-center space-x-4 p-4">
              <div className="w-16 h-16 rounded-full bg-gray-300"></div>
              <div className="flex-1 space-y-3">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="w-32 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="p-4 space-y-4">
              <div className="w-full h-4 bg-gray-300 rounded"></div>
              <div className="w-full h-4 bg-gray-300 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
