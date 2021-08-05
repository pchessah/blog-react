import React, { useContext } from 'react'
import { Link, Redirect } from "react-router-dom"
import { AuthContext } from "../../Auth"
import firebaseConfig from '../../config'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import "./profile.css"

const useStyles = makeStyles({
    addBlogpost: {
        minWidth: 275,
        margin: 5,
        backgroundColor: "#0786E0",
        color: "white"

    },
    viewBlogpost: {
        minWidth: 275,
        margin: 5,
        backgroundColor: "#DE9B3A",
        color: "white"

    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function Profile() {
    const classes = useStyles();

    const { currentUser } = useContext(AuthContext)
    let loggedInUser = firebaseConfig.auth().currentUser

    if (!currentUser) {
        window.alert("Log in first to view page.")
        return <Redirect to="/login" />
    }

    return (
        <div className="row">
            <div className="card col-12 p-2 mt-4">
            <h2>Your Profile</h2>
            <p>Name: {`${loggedInUser?.displayName}`} </p>
           <hr></hr>
            <div className="profile-actions row wrap">
                <Link to="/new-blogpost">
                    <div className="col">
                        <Card className={classes.addBlogpost}>
                            <CardContent>
                                Add Blog Post
                            </CardContent>
                        </Card>
                    </div>
                </Link>


                <Link to="/your-blogpost">
                    <div className="col">
                        <Card className={classes.viewBlogpost}>
                            <CardContent>
                                View Your Blog Posts
                            </CardContent>
                        </Card>
                    </div>
                </Link>
            </div>
        </div>
        </div>
        
    )
}

export default Profile
