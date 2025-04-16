import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Signup.css'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRole, setUserRole] = useState('');

    const handleSignup = async () => {

    }
    return (
        <div className="container-fluid signup-container">
            <div className="row justify-content-center">
                <div className="col-md-6 signup-box">
                    <h2>Signup</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="userName">User Name<span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="userName" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />

                            <label htmlFor="email">Email<span className="text-danger">*</span></label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

                            <label htmlFor="mobileNumber">Mobile Number<span className="text-danger">*</span></label>
                            <input type="mobileNumber" className="form-control" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Enter Mobile number" />

                            <label htmlFor="password">Password<span className="text-danger">*</span></label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />

                            <label htmlFor="confirmPassword">Confirm Password<span className="text-danger">*</span></label>
                            <input type="confirmPassword" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />

                            <label htmlFor="userRole">User Role<span className="text-danger">*</span></label>
                            <select className="form-control" id="userRole" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                                <option value="">Select Role</option>
                                <option value="Guide">Guide</option>
                                <option value="Traveller">Traveller</option>
                            </select>

                            <button type="button" className="btn btn-primary btn-block" onClick={handleSignup}>Submit</button>
                        </div>
                    </form>
                    <p className="mt-3">Already have an account?<a href="/login">Login</a></p>
                </div>
            </div>
        </div>

    )
}

export default Signup