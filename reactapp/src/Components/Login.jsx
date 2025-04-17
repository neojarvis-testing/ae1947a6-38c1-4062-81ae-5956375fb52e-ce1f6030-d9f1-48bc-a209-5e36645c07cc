import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async () => {
        // Reset errors
        setError('');
        setEmailError('');
        setPasswordError('');

        // Validate inputs
        if (!email) {
            setEmailError('Email is required');
        }
        if (!password) {
            setPasswordError('Password is required');
        }
        if (!email || !password) {
            return;
        }

        // Simulate login logic
        try {
            // Replace with actual login logic
            const response = await fakeLogin(email, password);
            if (response.success) {
                // Redirect to dashboard or home page
                window.location.href = '/dashboard';
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    // Simulate a login function (replace with actual API call)
    const fakeLogin = (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === 'test@example.com' && password === 'password') {
                    resolve({ success: true });
                } else {
                    resolve({ success: false });
                }
            }, 1000);
        });
    };

    return (
        <div className="container-fluid login-container">
            <div className="row">
                <div className="col-md-6 login-background">
                    <h1>Travel Tales</h1>
                    <p>Welcome to Travel Tales, your travel companion.</p>
                    <p>
                        Browse travel diaries around the world, create wonderful memories and find your perfect getaway, and receive personalized recommendations tailored to your travel style and budget.
                    </p>
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
