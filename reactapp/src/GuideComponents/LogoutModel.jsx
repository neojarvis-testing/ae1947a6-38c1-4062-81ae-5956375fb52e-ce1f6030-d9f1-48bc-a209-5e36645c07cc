import React from 'react'

const LogoutModel = ({onClose}) => {
    const handleLogout = () =>
    {
        onClose();
    }
  return (
    <div>
        <div className="modal">
            <h2>Are you sure you wnat to logout?</h2>
            <button className="btn btn-success" onClick={handleLogout}>Yes, Logout</button>
            <button className="btn btn-danger" onClick={onClose}>Cancel</button>
        </div>
    </div>
  )
}

export default LogoutModel