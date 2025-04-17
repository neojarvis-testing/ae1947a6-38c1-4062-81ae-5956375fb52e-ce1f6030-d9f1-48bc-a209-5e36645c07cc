import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TravellerNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutModel from '../GuideComponents/LogoutModel';


const TravellerNavbar = () => {
    const [showLogoutModel, setShowLogoutModel] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModel(true);
    };

    const handleCloseModel = () => {
        setShowLogoutModel(false);
    };

    return (
        <div className="home-page">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Travel Tales</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-3">
                            <Link className="nav-link" to="/profile">DemoTraveller/Traveller</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/HomePage">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/places">Places</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-light" onClick={handleLogoutClick}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            {showLogoutModel && <LogoutModel onClose={handleCloseModel} />}
        </div>
    );
};

export default TravellerNavbar;
