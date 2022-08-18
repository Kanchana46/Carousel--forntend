import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    //const user = localStorage.getItem('profile')
    return (
        <GoogleOAuthProvider clientId='746610514615-i8jnsiqtmh3jvqgstrsavdel388k60fk.apps.googleusercontent.com'>
            <BrowserRouter>
                <Container maxwidth="xl">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Navigate to="/posts" />} />
                        <Route path="/posts" element={<Home />} />
                        <Route path="/posts/search" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/posts/:id" element={<PostDetails />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
};

export default App;
