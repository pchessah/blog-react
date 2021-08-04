import React, { useContext } from 'react'
import { Link, Redirect } from "react-router-dom"
import { AuthContext } from "../../Auth"
import firebaseConfig from '../../config'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import "./profile.css"

const useStyles = makeStyles({
    root: {
        minWidth: 275,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
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
        <>
            <h2>Your Profile</h2>
            <h5>Name: {`${loggedInUser?.displayName}`} </h5>
            <button className="btn btn-outline-danger" onClick={() => firebaseConfig.auth().signOut()}>Sign Out</button>
            <div className="profile-actions row wrap">
                <div className="col">
                    <Link to="/new-blogpost">
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                Add Blog Post
                            </CardContent>
                        </Card>
                    </Link>
                </div>


                <div className="col">
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            View Your Blog Posts
                        </CardContent>

                    </Card>
                </div>

                <div className="col">
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            FAQs
                        </CardContent>

                    </Card>
                </div>
            </div>
        </>
    )
}

export default Profile
