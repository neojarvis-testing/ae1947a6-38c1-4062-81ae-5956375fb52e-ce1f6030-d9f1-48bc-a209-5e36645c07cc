import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TravellerNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const TravellerNavbar = () => {
    const [showLogoutModel, setShowLogoutModel] = useState(false);
    const navigate=useNavigate();

    const handleCloseModel = () => {
        setShowLogoutModel(false);
    };
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setShowLogoutModel(true);
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
                            <li className="nav-item"><Link className="nav-link" to="/viewplace">Place</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/profile">DemoTraveller/Traveller</Link></li>
                            <li className="nav-item">
                                <button className="btn btn-primary btn-block" onClick={handleLogoutClick}>Logout</button>
                            </li>
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

export default TravellerNavbar;
