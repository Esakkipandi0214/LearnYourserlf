import React, { useEffect, useRef, useState } from "react";

const SearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
  const data = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grapes",
  ]; // Example data

  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Filter data based on the search query

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.length > 0 && filteredData.length > 0);
  };

  const handleSelectItem = (item: string) => {
    setSearchQuery(item); // Set the selected item in the search box
    setShowDropdown(false); // Hide the dropdown
  };

  useEffect(()=>{
    const handleClickOutside = (event:MouseEvent)=>{
        if( dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
            setShowDropdown(false)
            setSearchQuery("")
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return()=>{
        document.removeEventListener("mousedown", handleClickOutside);
    }
  },[])

  return (
    <div  className="relative items-center flex gap-1  p-4 w-full max-w-sm">
        <div ref={dropdownRef} className="relative p-1 w-full max-w-sm">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
        className="border rounded-lg px-4 text-black py-2 w-full"
      />
      {showDropdown && (
        <ul className="absolute top-full left-4 w-full p-2 h-[200px] overflow-y-auto  bg-white border rounded-lg shadow mt-1 z-10">
          {filteredData.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelectItem(item)}
              className="p-2 hover:bg-gray-200 text-black rounded-lg cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      </div>
      <div >
        <button className=" py-2 px-3 text-white rounded-lg bg-red-500">+</button>
      </div>
    </div>
  );
};

export default SearchComponent;
