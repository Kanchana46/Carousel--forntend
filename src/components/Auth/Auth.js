import { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { GoogleLogin } from '@react-oauth/google';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { signin, signup } from '../../actions/auth';
import { AUTH } from "../../constants/actionType";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const switchMode = () => {
        setIsSignUp((prevSignup) => !prevSignup);
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const token = res?.credential;
        let userData = decode(token);
        const userDataObj = { data: { ...userData }, token: token };
        try {
            dispatch({ type: AUTH, data: userDataObj });
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (err) => {
        console.log(err)
        console.log('Google login Failed')
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.Avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignUp && (
                                    <>
                                        <Input
                                            name="firstName"
                                            label="First Name"
                                            handleChange={handleChange}
                                            autoFocus
                                            half
                                        />
                                        <Input
                                            name="lastName"
                                            label="Last Name"
                                            handleChange={handleChange}
                                            autoFocus
                                            half
                                        />
                                    </>
                                )
                            }
                            <Input
                                name="email"
                                label="Email Address"
                                handleChange={handleChange}
                                type="email"
                            />
                            <Input
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}
                                handleChange={handleChange}
                            />
                            {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}
                                type='password' />}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={googleFailure} />
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Auth;