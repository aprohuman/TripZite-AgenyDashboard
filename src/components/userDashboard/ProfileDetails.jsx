import React, { useState } from 'react'
import EditProfileModal from './EditProfileModal'

const ProfileDetails = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <section className="border-t-1  pt-[21px] pb-[21px]  border-b-1 border-[#000000]">
      <h3 className="text-[24px] font-[400]">Owner Details</h3>
      <p className="text=[11px]">
        *These details will be used for communication between <br />
        Tripzite and the agency as a first contact.
      </p>
      <div className="flex  gap-50 mt-4">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-[20px] text-[#5FA49F]">First Name:</h3>
            <p className="text-[20px] font-[400]">{user.firstName}</p>
          </div>
          <div>
            <h3 className="text-[20px] text-[#5FA49F]">DOB</h3>
            <p className="text-[20px] font-[400]">{user.dob}</p>
          </div>

          <div>
            <h3 className="text-[20px] text-[#5FA49F]">E-MAIL ID</h3>
            <p className="text-[20px] font-[400]">{user.email}</p>
          </div>
          <div>
            <h3 className="text-[20px] text-[#5FA49F]">COUNTRY</h3>
            <p className="text-[20px] font-[400]">{user.country}</p>
          </div>

          <div>
            <h3 className="text-[20px] text-[#5FA49F]">POSTAL CODE</h3>
            <p className="text-[20px] font-[400]">{user.postalCode}</p>
          </div>

          <div className="w-[176px] h-[43px] rounded-[10px] border-1 flex justify-center  items-center ">
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        </div>

        {/* right-side */}

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-[20px] text-[#5FA49F]">Last Name:</h3>
            <p className="text-[20px] font-[400]">{user.lastName}</p>
          </div>
          <div>
            <h3 className="text-[20px] text-[#5FA49F]">GENDER</h3>
            <p className="text-[20px] font-[400]">{user.gender}</p>
          </div>

          <div>
            <h3 className="text-[20px] text-[#5FA49F]">MOBILE NO.</h3>
            <p className="text-[20px] font-[400]">{user.mobile}</p>
          </div>
          <div>
            <h3 className="text-[20px] text-[#5FA49F]">STATE / PROVINCE</h3>
            <p className="text-[20px] font-[400]">{user.state}</p>
          </div>

          <div>
            <h3 className="text-[20px] text-[#5FA49F]">PERSONAL ID</h3>
            <p className="text-[20px] font-[400]">{user.personalId}</p>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <EditProfileModal
            user={user}
            onClose={() => setIsEditing(false)}
            onSave={onUpdateUser}
          />
        </div>
      )}
    </section>
  )
}

export default ProfileDetails
