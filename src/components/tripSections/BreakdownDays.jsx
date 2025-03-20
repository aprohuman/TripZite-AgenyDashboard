import React, {useState} from 'react';

const BreakdownDays = ({
    item,
    index,
    errors,
    files,
    tripBreakdownData,
    handleDrop,
    handleFileSelect,
    handleSelectChange,
    addItinerary,
    removeItinerary,
    handleItineraryChange,
})=> {
    const [isAccomodationExcluded, setIsAccomodationExcluded] = useState(true);
    const [isTransportExcluded, setIsTransportExcluded] = useState(true);
    const [isMealExcluded, setIsMealExcluded] = useState(true);


    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleChange= (e, id)=>{
          const { name, value} = e.target;
          
          if(name === "accommodation"){
            console.log(name, value, '2');
            setIsAccomodationExcluded(value == "notIncluded" ? true: false)
          }else if(name === "transport"){
            setIsTransportExcluded(value == "notIncluded" ? true: false)
          }else if(name === "meal"){
            setIsMealExcluded(value == "notIncluded"? true: false )
          }
          handleSelectChange(e, id);
    }

  return (
    <div>
    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between ">
      <p className="text-[20px] font-[400] mb-2 sm:mb-0">
        Location: {item.city}, {item.state} ,{item.country}
      </p>
      <div className="flex flex-col md:flex-row md:items-center md:justify-around w-full sm:w-1/2 ">
        <label className="text-[22px] font-[400] mb-2">
          Upload Images/Media
        </label>
        <div
          className="border-2 border-dashed border-gray-400 bg-blue-100 rounded-lg p-8 flex flex-col items-center justify-center"
          onDrop={(e) => handleDrop(e, item.days)}
          onDragOver={preventDefaults}
          onDragEnter={preventDefaults}
          onDragLeave={preventDefaults}
        >
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            id="file-upload"
            onChange={(e) => handleFileSelect(e, item.days)}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-gray-500 text-sm underline"
          >
            (UPLOAD FROM COMPUTER)
          </label>
          <p className="text-gray-500 text-sm mt-2">or</p>
          <p className="text-gray-500 text-sm">(drag & drop)</p>
        </div>
        {files.length > 0 && (
          <ul className="mt-2">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-700">
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    
    {/* Accommodation */}
    <div className=" ">
      <div className="my-4">
        <h4 className="text-[24px] font-[400] my-6 sm:my-8">
          Accommodation
        </h4>

        <div className="flex flex-col sm:flex-row  w-full sm:w-[75%] my-2 gap-4">
          <div className="flex flex-col justify-start items-start w-full sm:w-[32%]">
            <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
              Accommodation
            </label>
            <select
              id="accommodation"
              name="accommodation"
              className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full  outline-0"
              onChange={(e) => handleChange(e, item.id - 1)}
            >
              <option value="none" hidden></option>
              <option value="included">Included</option>
              <option value="notIncluded">Not Included</option>
            </select>
            <span className="text-red-500 text-xs mt-1">
              {errors[item.id]?.accommodation}
            </span>
          </div>

          <div className="flex flex-col justify-start items-start w-full sm:w-[32%] ">
            <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
              Accommodation Type
            </label>
            <select
              id="accommodationType"
              name="accommodationType"
              className={`box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full outline-0 ${isAccomodationExcluded ? `bg-gray-100 cursor-not-allowed text-gray-200 border-gray-200`: ``}`}
              onChange={(e) => handleSelectChange(e, item.id - 1)}
              disabled={isAccomodationExcluded}
            >
              <option value="none" hidden></option>
              <option value="Home Stay">Home Stay</option>
              <option value="Hotel">Hotel</option>
              <option value="Guest House">Guest House</option>
              <option value="Hostel">Hostel</option>
            </select>
            <span className="text-red-500 text-xs mt-1">
              {errors[item.id]?.accommodationType}
            </span>
          </div>

          <div className="flex flex-col justify-start items-start w-full sm:w-[32%] ">
            <label
              htmlFor="accommodationLocation"
              className="text-[18px] font-[400] md:mb-2 sm:mb-0"
            >
              Accommodation Location
            </label>
            <select
              id="accommodationLocation"
              name="accommodationLocation"
              className={`box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full outline-0 ${isAccomodationExcluded ? `bg-gray-100 cursor-not-allowed text-gray-200 border-gray-200`: ``}`}
              onChange={(e) => handleSelectChange(e, item.id - 1)}
              disabled={isAccomodationExcluded}
            >
              <option value="none" hidden></option>
              <option value={item.city}>{item.city}</option>
            </select>
            <span className="text-red-500 text-xs mt-1">
              {errors[item.id]?.accommodationLocation}
            </span>
          </div>
        </div>
      </div>
    </div>
    {/* Transport */}
    <div className="my-4 ">
      <h4 className="text-[24px] font-[400] my-6 sm:my-8">
        Transport
      </h4>
      <div className="flex flex-col sm:flex-row  w-full sm:w-[75%] my-2 gap-4 ">
        <div className="flex flex-col justify-start items-start w-full sm:w-[45%]">
          <label
            htmlFor="transport"
            className="text-[18px] font-[400] md:mb-2 sm:mb-0"
          >
            Transport
          </label>
          <select
            id="transport"
            name="transport"
            className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%]  outline-0"
            onChange={(e) => handleChange(e, item.id - 1)}
          >
            <option value="none" hidden></option>
            <option value="included">Included</option>
            <option value="notIncluded">Not Included</option>
          </select>
          <span className="text-red-500 text-xs mt-1">
            {errors[item.id]?.transport}
          </span>
        </div>
        <div className="flex flex-col justify-start items-start w-full sm:w-[45%]">
          <label
            htmlFor="transportType"
            className="text-[18px] font-[400] md:mb-2 sm:mb-0"
          >
            Transport Type
          </label>
          <select
            id="transportType"
            name="transportType"
            className={`box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%]  outline-0 ${isTransportExcluded ? `bg-gray-100 cursor-not-allowed text-gray-200 border-gray-200`: ``}`}
            onChange={(e) => handleSelectChange(e, item.id - 1)}
            // multiple
            disabled={isTransportExcluded}
          >
            <option value="none" hidden></option>
            <option value="flight">Flight</option>
            <option value="train">Train</option>
            <option value="bus">Bus</option>
            <option value="car-service">Car service</option>
          </select>
          <span className="text-red-500 text-xs mt-1">
            {errors[item.id]?.transportType}
          </span>
        </div>
      </div>
    </div>
    {/* Meal */}
    <div className="my-4 ">
      <h4 className="text-[24px] font-[400] my-6 sm:my-8">
        Meal
      </h4>
      <div className="flex flex-col sm:flex-row  w-full sm:w-[75%] my-2 gap-4">
        <div className="flex flex-col justify-start items-start w-full sm:w-[45%]">
          <label
            htmlFor="meal"
            className="text-[18px] font-[400] mb-2 "
          >
            Meal
          </label>
          <select
            id="meal"
            name="meal"
            className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%]  outline-0"
            onChange={(e) => handleChange(e, item.id - 1)}
          >
            <option value="none" hidden></option>
            <option value="included">Included</option>
            <option value="notIncluded">Not Included</option>
          </select>
          <span className="text-red-500 text-xs mt-1">
            {errors[item.id]?.meal}
          </span>
        </div>
        <div className="flex flex-col justify-start items-start w-full sm:w-[45%]">
          <label
            htmlFor="mealOption"
            className="text-[18px] font-[400] mb-2 "
          >
            Meal Option
          </label>
          <select
            id="mealOption"
            name="mealOption"
            className={`box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%] outline-0 ${isMealExcluded ? `bg-gray-100 cursor-not-allowed text-gray-200 border-gray-200`: ``}`}
            onChange={(e) => handleSelectChange(e, item.id - 1)}
            disabled={isMealExcluded}
          >
            <option value="" hidden></option>
            <option value="veg">Vegetarian</option>
            <option value="non-Vegetarian">Non-Vegetarian</option>
            <option value="Jain">Jain</option>
            <option value="Vegan">Vegan</option>
          </select>
          <span className="text-red-500 text-xs mt-1">
            {errors[item.id]?.mealOption}
          </span>
        </div>
      </div>
    </div>
    {/* itinerary */}
    <div className="mt-4">
      <h4 className="text-[24px] font-[400] my-10">
        Itinerary Of Day {item.days}
      </h4>

      <div className="flex flex-wrap gap-4 mt-2">
        {tripBreakdownData[index]?.itinerary?.map(
          (itinerary, i) => {
            return (
              <div
                key={itinerary.id}
                className="flex items-center w-full sm:w-auto relative"
              >
                <input
                  id={itinerary.id}
                  type="text"
                  value={itinerary.value}
                  onChange={(e) =>
                    handleItineraryChange(
                      e,
                      item.id - 1,
                      itinerary.id,
                    )
                  }
                  className="box-border p-3  border-1 border-[#0000004D] rounded-[6px]  mr-4  outline-0 w-full"
                />
                <button
                  type="button"
                  onClick={(e) =>
                    removeItinerary(e, item.id - 1, itinerary.id)
                  }
                  className="text-[24px] text-blue-500 ml-2 absolute right-6 cursor-pointer"
                >
                  x
                </button>
              </div>
            )
          },
        )}
        <button
          type="button"
          onClick={(e) => addItinerary(e, item.id - 1)}
          className=" text-[28px] text-red-500 text-lg cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  </div>
  )
}

export default BreakdownDays;
