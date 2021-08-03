import React, { useContext } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import "./login.css"
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../Auth"
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

function Login() {
  const classes = useStyles();

  const logIn = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value).catch((error) => {
        window.alert(error)
      })
    } catch (error) {
      return
    }
  }
  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    window.alert("logged in")
    return <Redirect to="/profile" />
  }




  return (
    <Container className="login-form" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <i className="fas fa-sign-out-alt"></i>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form onSubmit={logIn} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default Login
