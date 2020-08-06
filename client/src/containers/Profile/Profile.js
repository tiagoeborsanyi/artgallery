import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import ProfileComponent from '../../components/ProfileComponent/ProfileComponent'
import Spinner from '../../components/UI/Spinner/Spinner'

const Profile = (props) => {
  const [user, setUser] = useState()
  const isCancelled = useRef(false)

  useEffect(() => {
    const fecthData = async () => {
      try {
        const result = await axios.get(`/api/users/userbyid/${props.match.params.profileUId}`)
        if (!isCancelled.current) {
          setUser(result.data.user)
        }
      } catch(error) {}
    }
    fecthData()
    return () => {
      isCancelled.current = true
    }
  })

  let profile = <Spinner />
  if (user) {
    profile = <ProfileComponent user={user} />
  }

  console.log(user)
  return profile
}

export default Profile
