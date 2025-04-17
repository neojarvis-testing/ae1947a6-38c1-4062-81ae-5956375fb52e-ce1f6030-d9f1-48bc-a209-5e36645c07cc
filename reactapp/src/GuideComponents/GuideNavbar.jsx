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
        navigate('/LogoutModel')
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

                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
  

                            <select>
                            
                                <option value="">Place</option>
                                <option value="addplace"> <a href='/PlaceForm'>Add Place</a></option>
                                <option value=""><a href='/ViewPlace'>View Place</a></option>
                            </select>

                            <li className="nav-item"><Link className="nav-link" to="/profile">Demoguide/Guide</Link></li>
                                <li className="nav-item">
                                    <button className="btn btn-primary btn-block" onClick={handleLogoutClick}>Logout</button>
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
