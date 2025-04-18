import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GuideNavbar.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutModel from './LogoutModel';

const GuideNavbar = () => {
    const [showLogoutModel, setShowLogoutModel] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setShowLogoutModel(true);
        navigate('/LogoutModel');
    };

    const handleCloseModel = () => {
        setShowLogoutModel(false);
    };

    const handlePlaceChange = (e) => {
        navigate(e.target.value);
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
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/profile">Demoguide/Guide</Link></li>
                            <li className="nav-item">
                                <select 
                                    onChange={handlePlaceChange} 
                                    defaultValue=""
                                    className="form-select bg-dark text-white border-0"
                                >
                                    <option value="" disabled>Place</option>
                                    <option value="/add-place">Add Place</option>
                                    <option value="/view-place">View Place</option>
                                </select>
                            </li>
                            <button className="btn btn-primary btn-block" onClick={handleLogoutClick}>Logout</button>
                            
                        </ul>
                    </div>
                </div>
            </nav>
            {showLogoutModel && <LogoutModel onClose={handleCloseModel} />}
        </div>
    );
};

export default GuideNavbar;
