import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GuideNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutModel from './LogoutModel';

const GuideNavbar = () => {
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
                    </div>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

                            {/* <li className="nav-item dropdown">
                                <Link   className="nav-link dropdown-toggle" 
                                        to="/" 
                                        id="navbarDropdown" 
                                        role="button" 
                                        data-toggle="dropdown" 
                                        aria-haspopup="true" 
                                        aria-expanded="false"
                                >
                                    Place
                                </Link>
                                
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/add-place">Add Place</Link>
                                    <Link className="dropdown-item" to="/view-place">View Place</Link>
                                </div>

                            </li> */}

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Place
                                <Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/add-place">Add Place</Link>
                                <Link className="dropdown-item" to="/view-place">View Place</Link>
                                </div>
                            </li>

                            <li className="nav-item"><Link className="nav-link" to="/profile">Demoguide/Guide</Link></li>
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

export default GuideNavbar;
