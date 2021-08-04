import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import input from '@material-ui/core/input';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import "./signup.css"
import { Link, Redirect } from "react-router-dom"
import firebaseConfig from '../../config';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Signup() {
    const [currentUser, setCurrentUser] = useState(null);
    const classes = useStyles();

    const signUp = (e) => {
        e.preventDefault();

        const { email, password, firstName, lastName } = e.target.elements;


        if(email.value.length<1){
            alert("Insert email")
        } else if(password.value.length<7){
            alert("Password too short")
        }  else if(firstName.value.length<1){
            alert("Insert First Name")
        }  else if(lastName.value.length<1){
            alert("Insert Last Name")
        } else {
            try{
                firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value).then(()=>{
                    const loggedInUser = firebaseConfig.auth().currentUser
                    loggedInUser.updateProfile({
                        displayName: `${firstName.value} ${lastName.value}`
                    })
                    setCurrentUser(true)
                }).catch((error) => {
                    window.alert(error)
                })
    
            } catch(error){
                return
            }

        }


   

       
    }

    if (currentUser) {
        window.alert("Succesfully signed up. Logged In")
        return <Redirect to="/login" />
    }



    return (
        <Container className="sign-up-form  card pb-5 mt-5" component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <i className="fas fa-user-plus"></i>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form onSubmit={signUp} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <input
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                id="firstName"
                                placeholder="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <input
                                variant="outlined"
                                required
                                id="lastName"
                                placeholder="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                variant="outlined"
                                required
                                id="email"
                                placeholder="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                variant="outlined"
                                required
                                name="password"
                                placeholder="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link to="login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Signup
