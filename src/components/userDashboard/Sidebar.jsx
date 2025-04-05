const Sidebar = () => {
  return (
    <aside className=" w-1/4   flex flex-col justify-between items-center border-r-1 border-[#1027288F] ">
      <nav className="flex flex-col gap-8 h-[50%] border-t-1 border-b-1 border-[#000000] w-[90%]  items-start p-4">
        <div className="p-4">
          <div>
            <h3 className="text-[20px] font-bold">My Account</h3>
            <ul>
              <li className="text-[20px] pt-1">Upcoming Trips</li>
              <li className="text-[20px] pt-4">Your Packages</li>
              <li className="text-[20px] pt-4">Your Documents</li>
              <li className="text-[20px] pt-4">Notifications</li>
              <li className="text-[20px] pt-4">Account Settings</li>
              <li className="text-[20px] pt-4">Contact Us</li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <a className="text-gray-400" href="#">
              Switch Account
            </a>
            <a className="text-red-700" href="#">
              Log Out
            </a>
          </div>
        </div>
      </nav>
    </aside>
  )
}
export default Sidebar
