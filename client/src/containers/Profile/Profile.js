import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import ProfileComponent from '../../components/ProfileComponent/ProfileComponent'
import Spinner from '../../components/UI/Spinner/Spinner'

const Profile = (props) => {
  const [user, setUser] = useState()
  const isCancelled = useRef(false)
  const { profileUId } = props.match.params

  useEffect(() => {
    let mounted = true
    axios.get(`/api/users/userbyid/${profileUId}`).then(result => {
      if (mounted && result) {
        setUser(result.data.user)
      }
    })
    return () => mounted = false
  }, [profileUId])

  let profile = <Spinner />
  if (user) {
    profile = <ProfileComponent
      user={user}
      currentUid={props.uid} />
  }

  return profile
}

const mapStateToProps = state => {
  return {
    uid: state.auth.userId
  }
}

export default connect(mapStateToProps)(Profile)
