import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GuideNavbar from './GuideComponents/GuideNavbar';
import PlaceForm from './GuideComponents/PlaceForm';
import Login from './Components/Login';
import TravellerNavbar from './TravellerComponents/TravellerNavbar';
import Signup from './Components/Signup';
import ViewPlace from './GuideComponents/ViewPlace';
import HomePage from './Components/HomePage';
import ErrorPage from './Components/ErrorPage';
import PrivateRoute from './Components/PrivateRoute';
import TravellerViewPlace from './TravellerComponents/TravellerViewPlace';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/guide" element={<GuideNavbar username="GuideUser" role="Guide" />} />
                    <Route path="/traveller" element={<TravellerNavbar username="TravllerUser" role="Traveller" />} />
                    <Route path="/travellerviewplace" element={<TravellerViewPlace />} />
                    
                    <Route path="/placeform" element={<PlaceForm mode="add"/>} />
                    <Route path="/editPlace/:id" element={<PlaceForm mode="edit"/>} />
                    <Route path="/viewplace" element={<ViewPlace />} />
                    <Route path="/home" element={<HomePage/>}/> 
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
