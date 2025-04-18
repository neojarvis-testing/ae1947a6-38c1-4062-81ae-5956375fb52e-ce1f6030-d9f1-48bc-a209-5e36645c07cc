import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import API_BASE_URL from '../apiConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    const validateForm = () => {
        let valid = true;
        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Invalid Email');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else {
            setPasswordError('');
        }

        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
                const { token, role } = response.data;
                if(token && role){
                localStorage.setItem('token', token);
                localStorage.setItem('userRole', role);

                if (role === 'Guide') {
                    navigate('/guide');
                } else if (role === 'Traveller') {
                    navigate('/traveller');
                }
            }
           else {
                    setError("Login failed. Please check your credentials and try again.");
            }
                
            } catch (error) {
                setError("Login failed. Please check your credentials and try again.");
            }
        }
    };

    return (
        <div className="container-fluid login-container">
            <div className="row">
                <div className="col-md-6 login-background d-flex flex-column align-items-center justify-content-center">
                    <h1>Travel Tales</h1>
                    <p>Welcome to Travel Tales, your travel companion.</p>
                </div>
                <div className="col-md-6 login-box">
                    <h2>Login</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                            {emailError && <div className="text-danger">{emailError}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            {passwordError && <div className="text-danger">{passwordError}</div>}
                        </div>

                        <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
                        {error && <div className="text-danger mt-3">{error}</div>}
                    </form>
                    <p className="mt-3">Don't have an account? <a href="/signup">Signup</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
