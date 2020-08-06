import React from 'react'

import ProfileComponent from '../../components/ProfileComponent/ProfileComponent'

const Profile = (props) => {
  console.log(props)
  return (
    <div>
      <p>uid: {props.match.params.profileUId}</p>
      <ProfileComponent />
    </div>
  )
}

export default Profile
