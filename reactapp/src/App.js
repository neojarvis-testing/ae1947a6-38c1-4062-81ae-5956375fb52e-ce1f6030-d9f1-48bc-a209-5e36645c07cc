import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GuideNavbar from './GuideComponents/GuideNavbar';
import PlaceForm from './GuideComponents/PlaceForm';
import ViewPlace from './GuideComponents/ViewPlace';
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import LogoutModel from './GuideComponents/LogoutModel';



const App = () => {
    return (
        <Router>
            <div>
                <GuideNavbar />
                <Login/>
                <Signup/>
                <HomePage/>
                <LogoutModel/>
                <Routes>
                    <Route path="/PlaceForm" element={<PlaceForm/>} ></Route>
                    <Route path="/ViewPlace" element={<ViewPlace/>} ></Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
