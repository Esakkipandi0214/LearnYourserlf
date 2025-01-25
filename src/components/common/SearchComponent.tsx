import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface SearchComponentProps {
  data: string[]; // Accepts a list of data to display in the dropdown
  onSearch: (query: string) => void; // Callback when search query changes
}

const SearchComponent: React.FC<SearchComponentProps> = ({ data, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter data based on the search query
  const filteredData =
    searchQuery.trim() === ""
      ? data // Show all data if no query is entered
      : data.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Pass the updated search query to the parent
  };

  const handleSelectItem = (item: string) => {
    setSearchQuery(item); // Set the selected item in the search box
    setShowDropdown(false); // Hide the dropdown
    onSearch(item); // Pass the selected item to the parent
  };

  // Close the dropdown if clicked outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative items-center flex gap-1 p-4 w-full max-w-sm">
      <div ref={dropdownRef} className="relative p-1 w-full max-w-sm">
        <div className=" relative flex gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)} // Show dropdown when input is focused
          placeholder="Search..."
          className="border rounded-lg px-4 text-black py-2 w-full"
        />
        <div onClick={()=>{setSearchQuery("");setShowDropdown(false)}} className=" absolute top-3 p-0.5  flex justify-center items-center rounded-full bg-slate-400 right-2 ">
         <X size={10} color=" black"  />
         </div>
        </div>
        {showDropdown && (
          <ul className="absolute top-full left-0 w-full max-h-[100px] overflow-y-auto bg-white border rounded-lg shadow mt-1 z-10">
            {filteredData.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelectItem(item)}
                className="p-2 hover:bg-gray-200 text-black rounded-lg cursor-pointer"
              >
                {item}
              </li>
            ))}
            {filteredData.length === 0 && (
              <li className="p-2 text-gray-500 text-center">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
