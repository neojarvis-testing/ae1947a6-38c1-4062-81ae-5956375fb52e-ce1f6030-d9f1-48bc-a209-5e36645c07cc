import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutModel.css'; 

const LogoutModel = ({ onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate('/login');
      onClose();
    };

    return (
        <div className="modal-container">
            <div className="modal">
                <h2>Are you sure you want to logout?</h2>
                <button className="btn btn-success" onClick={handleLogout}>Yes, Logout</button>
                <button className="btn btn-danger" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default LogoutModel;
