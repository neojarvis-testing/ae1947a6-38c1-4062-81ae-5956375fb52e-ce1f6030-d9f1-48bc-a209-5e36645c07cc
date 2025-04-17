import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

    }
    return (
        <div className="container-fluid login-container">
            <div className="row">
                <div className="col-md-6 login-background">
                    <h1>Travels tales</h1>
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
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </div>

                        <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
                    
                    </form>

                    <p className="mt-3">Dont' have and account? <a href="/signup">Signup</a></p>
                </div>
            </div>
        </div>

    )
}

export default Login;