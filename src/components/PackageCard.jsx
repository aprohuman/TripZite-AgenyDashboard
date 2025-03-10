import deleteIcon from "../assets/images/Delete.svg";
import editIcon from "../assets/images/Edit.svg";
import pauseIcon from "../assets/images/Pause.svg";
import previewIcon from "../assets/images/Preview.svg";
import darjeelingImage from "../assets/images/Darjeeling.png";

const PackageCard = () => {
  return (
    <div className="max-w-[22rem] bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden p-4 mb-4">
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
      
      <div className="grid grid-cols-4 gap-4 text-center text-xs text-gray-700">

        <div className="flex flex-col items-center">
          <img className="mt-1 mb-[6px]" src={editIcon} alt="edit package" width={20} height={20} />
          <p className="text-[10px]">Edit this package</p>
        </div>

        <div className="flex flex-col items-center">
        <img src={pauseIcon} alt="pause package" width={30} height={30} />
          <p className="text-[10px]">Pause this package</p>
        </div>
        <div className="flex flex-col items-center">
        <img src={previewIcon} alt="preview package" width={30} height={30} />
        <p className="text-[10px]">View this package as customer</p>
        </div>
        
        <div className="flex flex-col items-center">
        <img className="mb-[6px]" src={deleteIcon} alt="delete package" width={18} height={18} />
          <p className="text-[10px]">Delete this package</p>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
