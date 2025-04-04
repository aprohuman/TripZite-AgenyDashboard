const NotificationCard = ({ title, message, link }) => {
  return (
    <div className="w-[162px]">
      <h4 className="text-[#5FA49F] pb-5">{title}</h4>
      <div className="bg-gray-400 p-20  rounded-[15px]"></div>
      <p className="text-[15px] pb-10"> {message}</p>
      <a href={link}>View upcoming Trips</a>
    </div>
  )
}
export default NotificationCard
