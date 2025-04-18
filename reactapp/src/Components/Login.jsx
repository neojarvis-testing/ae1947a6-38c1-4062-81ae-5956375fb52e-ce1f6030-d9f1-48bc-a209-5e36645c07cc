import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import baseUrl from '../apiConfig';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
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
                const response = await axios.post(`${baseUrl}/login`, { email, password });
                console.log(response.data);
                const fetchedToken = response.data.Token;
                localStorage.setItem("token", fetchedToken);
                const decoded = jwtDecode(fetchedToken);

                console.log(decoded);
                navigate(decoded.role === "Traveller" ? "/traveller" : "/guide");
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
                    <p>hiii</p>
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

                        <button type="button" className="btn btn-outline-primary" onClick={handleLogin}>Login</button>
                        {error && <div className="text-danger mt-3">{error}</div>}
                    </form>
                    <p className="mt-3">Don't have an account? <a href="/signup">Signup</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
