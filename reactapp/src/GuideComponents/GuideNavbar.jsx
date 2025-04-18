import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GuideNavbar.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import './GuideNavbar.css';
import baseUrl from '../apiConfig';


const GuideNavbar = () => {
    const [showLogoutModel, setShowLogoutModel] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setShowLogoutModel(true);
    };

    const handleCloseModel = () => {
        setShowLogoutModel(false);
    };

    const handleLogout = () => {
        navigate('/login');
        setShowLogoutModel(false);
    };

    const handleCancel = () => {
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
                            <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                            <select onChange={(e) => {
                                if (e.target.value) {
                                    window.location.href = e.target.value;
                                }
                            }}>
                                <option value="">Place</option>
                                <option value="placeform"><a href="/placeform">Add Place</a></option>
                                <option value="viewplace"><a href="/viewplace">View Place</a></option>
                            </select>
                            <li className="nav-item"><Link className="nav-link" to="/profile">Demoguide/Guide</Link></li>
                            <li className="nav-item">
                                <button className="btn btn-primary btn-block" onClick={handleLogoutClick}>Logout</button>
                            </li>
                            <button className="btn btn-primary btn-block" onClick={handleLogoutClick}>Logout</button>
                            
                        </ul>
                    </div>
                </div>
            </nav>
            <Modal show={showLogoutModel} onHide={handleCloseModel}>
                <Modal.Title>Confirmation</Modal.Title>
                <Modal.Header>
                    <Modal.Body>Are you sure you want to logout?</Modal.Body>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleLogout}>Yes, Logout</Button>
                    <Button variant="danger" onClick={handleCancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GuideNavbar;
