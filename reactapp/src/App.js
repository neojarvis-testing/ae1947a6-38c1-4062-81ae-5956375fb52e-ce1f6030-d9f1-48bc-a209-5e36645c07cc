import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GuideNavbar from './GuideComponents/GuideNavbar';
import PlaceForm from './GuideComponents/PlaceForm';
import ViewPlace from './GuideComponents/ViewPlace';
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import LogoutModel from './GuideComponents/LogoutModel';
import TravellerNavbar from './TravellerComponents/TravellerNavbar';
import ErrorPage from './Components/ErrorPage';
import TravellerViewPlace from './TravellerComponents/TravellerViewPlace';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/guide" element={<GuideNavbar />} />
                    <Route path="/traveller" element={<TravellerNavbar />} />
                    
                    {/* <Route element={<PrivateRoute allowedRoles={['Guide']} />}>
                    </Route>

                    <Route element={<PrivateRoute allowedRoles={['Traveller']} />}>
                    </Route> */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
