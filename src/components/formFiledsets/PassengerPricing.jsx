import React, { useState } from 'react'

export default function PassengerPricingForm({setStepsCompleted}) {
  const [passengerDetails, setPassengerDetails] = useState([
    { 
      id: 0,
      count: undefined, 
      pricing: '', 
      category: '' 
    }]);

    const [errors, setErrors] = useState([
      { 
        id: 0,
        count: null, 
        pricing: null, 
        category: null 
      }]);

  const addPassengerDetail = (e) => {
    e.preventDefault();
    setPassengerDetails((prev)=>[
      ...prev,
      { 
        id: prev.length,
        count: undefined, 
        pricing: '', 
        category: ''
      }
    ]);
    setErrors((prev)=>[
      ...prev,
      { 
        id: prev.length,
        count: null, 
        pricing: null, 
        category: null
      }
    ]);
  }

  const validatePasangerAndPricing = {
    count: (value) => {
      if (!value) return 'Pasanger count is required.'
      if (parseInt(value) < 1 ) return 'Passanger count can not be 0 or negative.'
      return '';
    },
    pricing: (value) => {
      if (!value) return 'Pricing is required'
      return '';
    },
    category: (value) => {
      if (!value) return ' Travel category is required.'
      return '';
    },
  }

  const handleChange = (e, id) => {
     const { name, value} = e.target;
    setPassengerDetails((prev)=>{
     return [...prev.map((detail)=>{
        if(detail.id === id){
          return {...detail, [name]: name === 'count' ? parseInt(value) : value}
        }
        return detail;
      }
      )]
    });

    const errorMessage = validatePasangerAndPricing[name](value);

    setErrors((prev) => {
      return [...prev.map((error)=>{  
        if(error.id === id){
          return {...error, [name]: errorMessage}
        }
        return error;
      }
    )];
    });


    let isFormCompleted = errors.every(
      (error) => !error.count && !error.pricing && !error.category
    );

    // let isFormCompleted = errors.every(
    //   (error) => Object.values(error).some(i => i !== "")
    // // );
    // let isFormCompleted = errors.every(error => 
    //   Object.values(error).every(value => !value || value.length === 0)
    // );

    // let tempe = JSON.parse(JSON.stringify(errors))
    // let te = [...tempe.map( (er)=>{
    //    delete er.id;
    //    return er;
    // })]

    // let isFormCompleted = te.every(
    //   (error) => !Object.values(error).some(i => i !== "")
    // );

    console.log(isFormCompleted, 'hit')
    setStepsCompleted((prev) => ({
      ...prev,
      'Passenger count and pricing': isFormCompleted,
    }));
  };



  const incrementCount = (e,id) => {
    e.preventDefault();
    const errorMessage = validatePasangerAndPricing.count((passengerDetails[id].count || 0) + 1);
    setPassengerDetails((prev)=>{
      return [...prev.map((detail)=>{
        if(detail.id === id){
          return {...detail, count: detail.count + 1}
        }
        return detail;
      }
      )]
    });

    setErrors((prev) => {
      return [...prev.map((error)=>{  
        if(error.id === id){
          return {...error, count: errorMessage}
        }
        return error;
      }
    )];
    });

    let isFormCompleted = errors.every(
      (error) => !error.count && !error.pricing && !error.category
    );
  
    // let tempe = JSON.parse(JSON.stringify(errors))
    // let te = [...tempe.map( (er)=>{
    //    delete er.id;
    //    return er;
    // })]

    // let isFormCompleted = te.every(
    //   (error) => !Object.values(error).some(i => i !== "")
    // );

    // let isFormCompleted = errors.every(error => 
    //   Object.values(error).every(value => !value || value.length === 0)
    // );

    console.log(isFormCompleted, 'hit')
    setStepsCompleted((prev) => ({
      ...prev,
      'Passenger count and pricing': isFormCompleted,
    }));
  }

  const decrementCount = (e, id) => {
    e.preventDefault();
    const errorMessage = validatePasangerAndPricing.count((passengerDetails[id].count || 0) - 1);
    setPassengerDetails((prev)=>{
      return [...prev.map((detail)=>{
        if(detail.id === id){
          return {...detail, count: detail.count - 1}
        }
        return detail;
      }
      )]
    });

    setErrors((prev) => {
      return [...prev.map((error)=>{  
        if(error.id === id){
          return {...error, count: errorMessage}
        }
        return error;
      }
    )];
    });



    // let tempe = JSON.parse(JSON.stringify(errors))
    // let te = [...tempe.map( (er)=>{
    //    delete er.id;
    //    return er;
    // })]

    // let isFormCompleted = te.every(
    //   (error) => !Object.values(error).some(i => i !== "")
    // );

    let isFormCompleted = errors.every(
      (error) => !error.count && !error.pricing && !error.category
    );

    console.log(isFormCompleted, 'hit')
    setStepsCompleted((prev) => ({
      ...prev,
      'Passenger count and pricing': isFormCompleted,
    }));

  };

  return (
    <div className="p-4 md:p-8 bg-white mt-2">
      <h2 className="text-[2rem] font-[400]  text-black mb-6">
        Passenger Count And Pricing :
      </h2>
      {passengerDetails.map((detail) => (
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 rounded-lg"
          key={detail.id} >
          <div>
            <label className="text-[20px] font-[400] ">Passenger Count</label>
            <div className="flex items-center ">
              <input
                type="number"
                name="count"
                placeholder='Number Of Passangers'
                value={detail.count}
                onChange={(e) => handleChange(e, detail.id)}
                className="p-2  border-1 border-[#0000004D] rounded-[6px]  w-full  outline-0 text-center mr-2 my-2"
              />
              <button
                onClick={(e) => incrementCount(e,detail.id)}
                className=" border-1 border-[#0000004D] rounded-[6px] p-2 w-[44px]"
              >
                +
              </button>
              <button
                onClick={(e) => decrementCount(e,detail.id)}
                className=" border-1 border-[#0000004D] rounded-[6px] p-2  w-[44px] ml-2"
              >
                -
              </button>
            </div>
            <span className="text-red-500 text-xs mt-1">
                    {errors[detail.id].count}
            </span>
          </div>

          <div>
            <label className="text-[20px] font-[400]">Pricing</label>
            <input
              type="text"
              name="pricing"
              value={detail.pricing}
              onChange={(e) => handleChange(e, detail.id)}
              className="p-2  border-1 border-[#0000004D] rounded-[6px]  w-full my-2  outline-0"
            />
              <span className="text-red-500 text-xs mt-1">
                    {errors[detail.id].pricing}
               </span>
          </div>

          <div>
            <label className="text-[20px] font-[400]">Travel Category</label>
            <select
              value={detail.category}
              name="category"
              onChange={(e) => handleChange(e, detail.id)}
              className="p-2  border-1 border-[#0000004D] rounded-[6px]  w-full my-2 outline-0"
            >
              <option value="" >Select Category</option>
              <option value="Solo Trip">Solo Trip</option>
              <option value="Adventurous Trip">Adventurous Trip</option>
              <option value="Romantic Getaway">Romantic Getaway</option>
              <option value="Friends & Family Getaway">Friends & Family Getaway</option>
              <option value="Wellness Getaway">Wellness Getaway</option>
              <option value="Travel Expedition">Travel Expedition</option>
            </select>
            <span className="text-red-500 text-xs mt-1">
                    {errors[detail.id].category}
            </span>
          </div>
        </div>
      ))}

      <button
        onClick={addPassengerDetail}
        className="mt-4 text-gray-400 px-4 py-2 rounded-lg w-full md:w-auto"
      >
        + Add more passenger count & pricing
      </button>
    </div>
  )
}





const e = [
  { 
    id: 0,
    count: '', 
    pricing: '', 
    category: '' 
  },
  { 
    id: 1,
    count: '', 
    pricing: '', 
    category: '' 
  },
];