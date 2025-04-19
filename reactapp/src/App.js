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
                    <Route path="/home" element={<HomePage />} />
                    <Route path="*" element={<ErrorPage />} />

                    {/* Private Routes for Guide */}
                    <Route
                        path="/guide"
                        element={
                            <PrivateRoute allowedRoles={['Guide']}>
                                <GuideNavbar username="GuideUser" role="Guide" />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/placeform"
                        element={
                            <PrivateRoute allowedRoles={['Guide']}>
                                <PlaceForm mode="add" />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/editPlace"
                        element={
                            <PrivateRoute allowedRoles={['Guide']}>
                                <PlaceForm mode="edit" />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/viewplace"
                        element={
                            <PrivateRoute allowedRoles={['Guide']}>
                                <ViewPlace />
                            </PrivateRoute>
                        }
                    />

                    {/* Private Routes for Traveller */}
                    <Route
                        path="/traveller"
                        element={
                            <PrivateRoute allowedRoles={['Traveller']}>
                                <TravellerNavbar username="TravellerUser" role="Traveller" />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/travellerviewplace"
                        element={
                            <PrivateRoute allowedRoles={['Traveller']}>
                                <TravellerViewPlace />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
