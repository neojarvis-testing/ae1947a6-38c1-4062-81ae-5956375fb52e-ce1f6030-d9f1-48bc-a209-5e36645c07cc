import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GuideNavbar from './GuideComponents/GuideNavbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import ErrorPage from './Components/ErrorPage';
import PrivateRoute from './Components/PrivateRoute';


const App = () => {
    return (
         <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/homepage" element={<HomePage />} />
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="/guide" element={<GuideNavbar />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
