import deleteIcon from "../assets/images/Delete.svg";
import editIcon from "../assets/images/Edit.svg";
import pauseIcon from "../assets/images/Pause.svg";
import previewIcon from "../assets/images/Preview.svg";
import darjeelingImage from "../assets/images/Darjeeling.png";

const PackageCard = () => {
  return (
    <div className=" flex-[0_1_32%] bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden p-4 mb-4">
      <div className="relative rounded-[14px] overflow-hidden">
        <img
          className="w-full h-60 object-cover"
          src={darjeelingImage}
          alt="Darjeeling"
        />
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-semibold text-black">Darjeeling</h2>
        <p className="text-gray-600 mt-2 text-sm">
          A travel agency is a private retailer or public service that provides
          travel and tourism-related services to the general public on behalf of
          accommodation.
        </p>

        <div className="flex flex-col justify-between items-end mt-4">
          <p className="text-2xl font-bold">₹15,000/-</p>
          <p className="text-gray-400 font-semibold">1 Person</p>
        </div>
      </div>

      <hr className=" mb-4 border-gray-300" />


        <div className="w-full flex justify-between items-start">
        <div className='flex-[0_1_35%] grid grid-cols-2 sm:grid-cols-2 gap-1 sm:gap-2 text-center'>

      
         <div className="flex flex-col items-center p-1">
           <img className="w-4 h-4 sm:w-5 sm:h-5 md:h-8" src={editIcon} alt="edit" />
           <p className="text-[8px] sm:text-xs mt-1">Edit your package.</p>
         </div>

         <div className="flex flex-col items-center p-1 ">
           <img className="w-5 h-5 sm:w-6 sm:h-6 md:h-8 md:w-8" src={pauseIcon} alt="pause" />
           <p className="text-[8px] sm:text-xs mt-1">Pause this package.</p>
         </div>
         </div>

         <div className='flex-[0_1_45%] grid grid-cols-2 sm:grid-cols-2 gap-1 sm:gap-2 text-center'>
         <div className="flex flex-col items-center p-1">
           <span className="px-4 py-[3px] bg-green-950 text-white items-center rounded-[4px]">
             Preview
           </span>
           <p className="text-[8px] sm:text-xs">
             View this package as a customer.
           </p>
         </div>

         <div className="flex flex-col items-center p-1">
           <img
             className="w-4 h-8 sm:w-5 sm:h-5 md:h-7"
             src={deleteIcon}
             alt="delete"
           />
           <p className="text-[8px] sm:text-xs mt-1">Delete Package.</p>
         </div>
         </div>
      </div>
    </div>
  );
};

export default PackageCard;

