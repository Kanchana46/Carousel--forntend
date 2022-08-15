import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOGOUT } from "../../constants/actionType";

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))?.data);

    useEffect(() => {
        if (localStorage.getItem('profile')) {
            setUser(JSON.parse(localStorage.getItem('profile'))?.data);
        }
        let token = JSON.parse(localStorage.getItem('profile'))?.token;

        if (token) {
            const decodedToken = jwt_decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
    }, [location])

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate('/');
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"></img>
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.name} src={user.picture}>
                                {user.name?.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                            <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <div>
                            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                        </div>
                    )
                }
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;