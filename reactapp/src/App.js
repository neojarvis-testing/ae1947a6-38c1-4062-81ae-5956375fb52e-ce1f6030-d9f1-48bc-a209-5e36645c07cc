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


const App = () => {
    return (
        <Router>
            <div>
                <TravellerNavbar/>
                <GuideNavbar />
                <Login/>
                <HomePage/>
                <ErrorPage/>
                <TravellerViewPlace/>
                <Signup/>
                <PlaceForm/>
                <ViewPlace/>
                <LogoutModel/>
                <Routes>
                    <Route path ="/HomePage" element={<HomePage/>} ></Route>
                    <Route path="/PlaceForm" element={<PlaceForm/>} ></Route>
                    <Route path="/ViewPlace" element={<ViewPlace/>} ></Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
