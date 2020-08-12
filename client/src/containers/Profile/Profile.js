import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import ProfileComponent from '../../components/ProfileComponent/ProfileComponent'
import Spinner from '../../components/UI/Spinner/Spinner'

const Profile = (props) => {
  const [user, setUser] = useState()
  const { profileUId } = props.match.params
  const [follower, setFollower] = useState(false)

  useEffect(() => {
    let mounted = true
    axios.get(`/api/users/userbyid/${profileUId}`).then(result => {
      if (mounted && result) {
        console.log(result.data)
        setUser(result.data.user)
        if (result.data.user.followers.filter(follow => follow.uid === profileUId).length > 0) {
          setFollower(true)
        }
      }
    })
    return () => mounted = false
  }, [profileUId])

  let profile = <Spinner />
  if (user) {
    profile = <ProfileComponent
      user={user}
      currentUid={props.uid}
      follower={follower} />
  }

  return profile
}

const mapStateToProps = state => {
  return {
    uid: state.auth.userId
  }
}

export default connect(mapStateToProps)(Profile)
