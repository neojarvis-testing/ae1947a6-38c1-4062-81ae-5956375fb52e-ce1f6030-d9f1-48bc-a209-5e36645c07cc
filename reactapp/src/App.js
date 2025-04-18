import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GuideNavbar from './GuideComponents/GuideNavbar';
import PlaceForm from './GuideComponents/PlaceForm';
import ViewPlace from './GuideComponents/ViewPlace';
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
<<<<<<< HEAD


=======
import LogoutModel from './GuideComponents/LogoutModel';
import TravellerNavbar from './TravellerComponents/TravellerNavbar';
import ErrorPage from './Components/ErrorPage';
import TravellerViewPlace from './TravellerComponents/TravellerViewPlace';
import PrivateRoute from './Components/PrivateRoute';
>>>>>>> 4fd1607be12621b695f3dd7170f2e6f865f54a8f


const App = () => {
    return (
       
            <Router>
            <div>
                <Routes>
<<<<<<< HEAD
                    <Route path='/Signup' element={<Signup/>}></Route> 
                    <Route path='/' element={<Login/>}></Route>
                    <Route path ="/HomePage" element={<HomePage/>} ></Route>
                    <Route path="/PlaceForm" element={<PlaceForm/>} ></Route>
                    <Route path="/ViewPlace" element={<ViewPlace/>} ></Route>
                    <Route path="/GuideNavBar" element={<GuideNavbar/>} ></Route>
=======
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    
                    <Route element={<PrivateRoute/>}>
                        <Route path="/homepage" element={<HomePage />} />
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="/guide" element={<GuideNavbar />} />
                        <Route path="/traveller" element={<TravellerNavbar/>} />

                    
                    </Route>
>>>>>>> 4fd1607be12621b695f3dd7170f2e6f865f54a8f
                </Routes>
            </div>
        </Router>
        
 
    );
};

export default App;
