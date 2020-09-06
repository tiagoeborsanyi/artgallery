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
        // console.log(result.data)
        setUser(result.data.user)
        if (result.data.user.followers.filter(follow => follow.uid === props.uid).length > 0) {
          setFollower(true)
        }
      }
    })
    return () => mounted = false
  }, [profileUId, props.uid])

  const onFollowerHandler = async (uid) => {
    const ObjFollow = {
      uidFollow: uid, // following (porque eu vou seguir esse id)
      uidFollowed: props.uid // followers (é a pessoa que vai me seguir)
      // mas esse follower eu tenho que gravar no banco de dados desse usuario pq eu sou um
      // seguidor dele
    }
    if (!uid || !props.uid) {
      return;
    }
    try {
      const result = await axios.post('/api/users/follow', ObjFollow)
      if (result.status === 201) {
        // console.log(result)
        setFollower(!follower)
        setUser({
          ...user,
          followers: result.data.follow.followers
        })
      }
    } catch (error) {
      // tem que colocar uma modal de error
      console.log(error.response)
    }
  }
  // console.log(user)
  let profile = <Spinner />
  if (user) {
    profile = <ProfileComponent
      user={user}
      currentUid={props.uid}
      follower={follower}
      onFollower={onFollowerHandler}
      match={props.match}
      location={props.location} />
  }

  return profile
}

const mapStateToProps = state => {
  return {
    uid: state.auth.userId
  }
}

export default connect(mapStateToProps)(Profile)
