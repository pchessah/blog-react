import React, { useContext } from 'react'
import { Redirect } from "react-router-dom"
import { AuthContext } from "../../Auth"
import firebaseConfig from '../../config'

function Profile() {
    const { currentUser } = useContext(AuthContext)
    let loggedInUser = firebaseConfig.auth().currentUser

    if (!currentUser) {
        window.alert("Log in first to view page.")
        return <Redirect to="/login" />
    }
  
    return (
       
        <>
            <h2>Your Profile</h2>
            <h5>Name: {`${loggedInUser?.displayName}`} </h5>
            <button className="btn btn-outline-danger" onClick={() => firebaseConfig.auth().signOut()}>Sign Out</button>
        </>
    )
}

export default Profile
