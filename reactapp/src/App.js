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
<<<<<<< HEAD
         <Router>
=======
        <Router>
>>>>>>> 701d13af5a4e9df3b20759202e2a495c03e662b2
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
<<<<<<< HEAD
                    <Route element={<PrivateRoute />}>
                        <Route path="/homepage" element={<HomePage />} />
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="/guide" element={<GuideNavbar />} />
=======
                    <Route path="/guide" element={<GuideNavbar />} />
                    <Route path="/traveller" element={<TravellerNavbar />} />
                    
                    {/* <Route element={<PrivateRoute allowedRoles={['Guide']} />}>
>>>>>>> 701d13af5a4e9df3b20759202e2a495c03e662b2
                    </Route>

                    <Route element={<PrivateRoute allowedRoles={['Traveller']} />}>
                    </Route> */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
