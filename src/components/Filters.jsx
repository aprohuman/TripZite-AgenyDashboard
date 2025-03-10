import React from "react";
import { useNavigate } from "react-router-dom";

const Filters = ({filters, setFilters}) => {
    const navigate = useNavigate();

 const handleChange = (e) => {
   const {name, value} = e.target
   setFilters((prev)=>{
     return {
        ...prev,
        [name]: value
     }
   })
  };

  return (
    <div className="relative flex items-center space-x-6  pl-[17%] p-5 "
     style={{background: "linear-gradient(to right, #A3ABD1 7%, #C4C9E1 15%, white 25%, white 60%, white 100%)"}}>
        <button onClick={()=>navigate('/dashboard')} className="absolute text-black font-semibold left-6 cursor-pointer">«</button>
      
      <div className="flex items-center space-x-4 gap-8 container mx-auto px-4">
        <div className="relative">
          <select
            className="font-base cursor-pointer focus:outline-none min-w-[100px]"
            name="sortMethod"
            value={filters.sortMethod}
            onChange={(e) => handleChange(e)}
          >
            <option disabled>Sort By</option>
            <option>Relevance</option>

            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="relative">
          <select
            className="font-base cursor-pointer focus:outline-non min-w-[100px]"
            name="location"
            value={filters.location}
            onChange={(e) => handleChange(e)}
          >
             <option disabled>Location</option>
            <option>All</option>
            <option>India</option>
            <option>USA</option>
          </select>
        </div>

        <div className="relative">
          <select
            className="font-base cursor-pointer focus:outline-none min-w-[100px]"
            name="priceRange"
            value={filters.priceRange}
            onChange={(e) => handleChange(e)}
          >
             <option disabled>Price Range</option>
            <option>Any</option>
            <option>Under ₹5000</option>
            <option>₹5000 - ₹10000</option>
          </select>
        </div>

        <div className="relative">
          <select
            className="font-base cursor-pointer focus:outline-none min-w-[100px]"
            name="rating"
            value={filters.rating}
            onChange={(e) => handleChange(e)}
          >
             <option disabled>Rating</option>
            <option>All</option>
            <option>4+ Stars</option>
            <option>3+ Stars</option>
          </select>
        </div>

        <div className="relative">
          <select
            className="font-base cursor-pointer focus:outline-none min-w-[100px]"
            name="category"
            value={filters.category}
            onChange={(e) => handleChange(e)}
          >
            <option disabled>Travel Category</option>
            <option>All</option>
            <option>Adventure</option>
            <option>Luxury</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;