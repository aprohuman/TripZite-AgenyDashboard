import React, { useState } from 'react'
import EditProfileModal from './EditProfileModal'

const ProfileDetails = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <section className="border-t-2  pt-4 border-b-2 ">
      <h3>Owner Details</h3>
      <p>
        <strong>First Name:</strong> {user.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Mobile:</strong> {user.mobile}
      </p>
      <p>
        <strong>Country:</strong> {user.country}
      </p>
      <p>
        <strong>State:</strong> {user.state}
      </p>
      <p>
        <strong>Personal ID:</strong> {user.personalId}
      </p>

      <button onClick={() => setIsEditing(true)}>Edit Profile</button>

      {isEditing && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditing(false)}
          onSave={onUpdateUser}
        />
      )}
    </section>
  )
}

export default ProfileDetails
