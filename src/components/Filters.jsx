import React from 'react'
import { useNavigate } from 'react-router-dom'

const Filters = ({ filters, setFilters }) => {
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="relative  flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 md:pl-[10%] lg:pl-[17%] bg-[#A3ABD1] md:bg-gradient-to-r md:from-[#A3ABD1] md:from-[7%] md:via-[#C4C9E1] md:via-[15%] md:to-white md:to-[25%]">
      <button
        onClick={() => navigate('/dashboard')}
        className="md:absolute text-black font-semibold md:left-6 cursor-pointer"
      >
        « Back
      </button>

      <div className="w-full flex flex-col md:flex-row flex-wrap gap-4 md:gap-6">
        {/* Sort Method */}
        <div className="flex-1 w-full md:min-w-[150px] md:max-w-[200px]">
          <select
            className="w-full font-base cursor-pointer focus:outline-none p-2 bg-white rounded"
            name="sortMethod"
            value={filters.sortMethod}
            onChange={handleChange}
          >
            <option disabled>Sort By</option>
            <option value="relevance">Relevance</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex-1 w-full md:min-w-[150px] md:max-w-[200px]">
          <select
            className="w-full font-base cursor-pointer focus:outline-none p-2 bg-white rounded"
            name="location"
            value={filters.location}
            onChange={handleChange}
          >
            <option disabled>Location</option>
            <option value="all">All</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex-1 w-full md:min-w-[150px] md:max-w-[200px]">
          <select
            className="w-full font-base cursor-pointer focus:outline-none p-2 bg-white rounded"
            name="priceRange"
            value={filters.priceRange}
            onChange={handleChange}
          >
            <option disabled>Price Range</option>
            <option value="any">Any</option>
            <option value="under-₹5000">Under ₹5000</option>
            <option value="₹5000-₹10000">₹5000 - ₹10000</option>
          </select>
        </div>

        {/* Rating */}
        <div className="flex-1 w-full md:min-w-[150px] md:max-w-[200px]">
          <select
            className="w-full font-base cursor-pointer focus:outline-none p-2 bg-white rounded"
            name="rating"
            value={filters.rating}
            onChange={handleChange}
          >
            <option disabled>Rating</option>
            <option>All</option>
            <option>4+ Stars</option>
            <option>3+ Stars</option>
          </select>
        </div>

        {/* Travel Category */}
        <div className="flex-1 w-full md:min-w-[150px] md:max-w-[200px]">
          <select
            className="w-full font-base cursor-pointer focus:outline-none p-2  bg-white rounded"
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            <option disabled>Travel Category</option>
            <option>All</option>
            <option>Adventure</option>
            <option>Luxury</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filters
