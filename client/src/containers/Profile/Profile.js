import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import ProfileComponent from '../../components/ProfileComponent/ProfileComponent'
import Spinner from '../../components/UI/Spinner/Spinner'

const Profile = (props) => {
  const [user, setUser] = useState()
  const [follower, setFollower] = useState(false)
  const { profileUId } = props.match.params

  useEffect(() => {
    let mounted = true
    axios.get(`/api/users/userbyid/${profileUId}`).then(result => {
      if (mounted && result) {
        console.log(result.data)
        setUser(result.data.user)
        if (result.data.user.followers.filter(follow => follow.uid === props.uid).length > 0) {
          setFollower(true)
        }
      }
    })
    return () => mounted = false
  }, [profileUId])

  const onFollowerHandler = (uid) => {
    console.log(uid)
  }

  let profile = <Spinner />
  if (user) {
    profile = <ProfileComponent
      user={user}
      currentUid={props.uid}
      follower={follower}
      onFollower={onFollowerHandler} />
  }

  return profile
}

const mapStateToProps = state => {
  return {
    uid: state.auth.userId
  }
}

export default connect(mapStateToProps)(Profile)
