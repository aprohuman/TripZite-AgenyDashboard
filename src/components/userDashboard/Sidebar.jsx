const Sidebar = () => {
  return (
    <aside className=" w-1/4 h-full  flex flex-col justify-between border-r-1 border-gray-300">
      <nav className="flex flex-col gap-8 h-[50%] border-t-1 border-b-1  ">
        <ul>
          <li>Upcoming Trips</li>
          <li>Your Packages</li>
          <li>Your Documents</li>
          <li>Notifications</li>
          <li>Account Settings</li>
          <li>Contact Us</li>
        </ul>
        <div className="flex flex-col gap-4">
          <a href="#">Switch Account</a>
          <a href="#">Log Out</a>
        </div>
      </nav>
    </aside>
  )
}
export default Sidebar
