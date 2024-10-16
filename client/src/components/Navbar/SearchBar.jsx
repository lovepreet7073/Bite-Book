import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
const SearchBar = () => {
  return (
    <div>
         <div className="relative mx-4  lg:w-[27rem] flex border  border-[#FF6216] rounded-md justify-between items-center px-2">
      <input
        type="text"
        placeholder="Search recipes or ingredients..."
        className="block p-[3px] lg:p-[5px] w-full   bg-transparent text-white  placeholder-neutral-400 focus:border-[#FF6216] focus:ring-[#FF6216] sm:w-64 focus:outline-none"
      />
    <IoSearchSharp size={22} className='text-[#FF6216]'/>
    </div>
    </div>
  )
}

export default SearchBar