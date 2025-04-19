import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import baseUrl from '../apiConfig';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        let formErrors = {};

        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!validEmail.test(formData.email)) {
            formErrors.email = "Please enter a valid email.";
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post(`${baseUrl}/login`, formData);
                const token = response.data.Token; // Ensure the token is correctly retrieved
                console.log('Token:', token); // Log the token to check its value

                localStorage.setItem('token', token);

                // Decode the token
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);
                localStorage.setItem('role', decodedToken.role);

                // Extract and store username and role
                const username = decodedToken.name; // Ensure the backend includes 'username' in the token

                localStorage.setItem('username', username);

                // Navigate to the homepage
                navigate('/home');
            } catch (error) {
                console.error("Login failed:", error.response?.data || error.message);
                setErrors({ apiError: "Invalid email or password." });
            }
        }
    };

    return (
        <div className="container-fluid login-container">
            <div className="login-background">
                <h1>Travelista Tours</h1>
                <p>Travel is the only purchase that enriches you in ways beyond material wealth.</p>
            </div>
            <div className="login-box">
                <img src="eroplane.png" alt="Airplane" className="airplane-icon" />
                <h2>Welcome</h2>
                <p>Login with Email</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"/>
                        <div className="text-danger">{errors.password}</div>
                    </div>
                    <a href="#" className="text-primary">Forgot your password?</a>
                    {errors.apiError && <span className='text-danger'>{errors.apiError}</span>}
                    <button type="submit" className="btn btn-primary mt-3">LOGIN</button>
                </form>
                <div className="bottom-illustrations">
                    <img src="taj.png" alt="Taj Mahal" />
                    <img src="building.png" alt="Building" />
                </div>
                <p className="mt-3">Don't have an account? <span onClick={() => navigate('/signup')}>Register Now</span></p>
            </div>
        </div>
    );
};

export default Login;
