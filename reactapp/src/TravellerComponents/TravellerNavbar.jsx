import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TravellerNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const TravellerNavbar = () => {

    const navigate=useNavigate();

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    


    return (
        <div className="home-page">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Travel Tales</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="/profile">Traveller</Link></li>


                            <li className="nav-item"><Link className="nav-link" to="/places">Places</Link></li>
                            <li className="nav-item">
                                <button className="btn btn-danger" onClick={handleLogoutClick}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default TravellerNavbar;
