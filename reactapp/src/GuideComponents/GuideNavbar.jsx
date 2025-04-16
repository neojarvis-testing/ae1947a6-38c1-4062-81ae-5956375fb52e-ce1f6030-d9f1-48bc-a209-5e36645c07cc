import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './GuideNavbar.css';
import LogoutModel from './LogoutModel';

const GuideNavbar = () => {
    const[showLogoutModel, setshowLogoutModel] = useState(false);
    const handleLogoutClick = () =>
    {
        setshowLogoutModel(true);
    }
    const handleCloseModel =() =>
    {
        setshowLogoutModel(false);
    }
  return (
    <div className="home-page">
        <h1>Travel Tiles</h1>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Place</Link></li>
                <li><Link to="/profile">Demoguide/Guide</Link></li>
                <li><button onClick={handleLogoutClick}>Logout</button></li>
            </ul>
            {showLogoutModel && <showLogoutModel onClose={handleCloseModel}/>}
        </nav>
    </div>
  )
}

export default GuideNavbar