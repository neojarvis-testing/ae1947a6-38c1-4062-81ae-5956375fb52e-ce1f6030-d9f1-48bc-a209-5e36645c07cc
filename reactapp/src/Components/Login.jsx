import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import baseUrl from '../apiConfig';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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
                const token = response.data.Token;
                console.log('Token:', token);

                localStorage.setItem('token', token);

                // Decode the token
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);

                // Extract and store username and role
                const username = decodedToken.name;
                const role = decodedToken.role;

                localStorage.setItem('username', username);
                localStorage.setItem('role', role);

                // Navigate to the homepage
                navigate('/home');
            } catch (error) {
                console.error("Login failed:", error.response?.data || error.message);
                setErrors({ apiError: "Invalid email or password." });
            }
        }
    };

    return (
        // <div className="container-fluid">
        //     <div className="row main-content bg-success text-center">
        //         <div className="col-md-4 text-center company__info">
        //         <span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>  
        //             <h1>Travel Tales</h1>
        //             <p>Welcome to Travel Tales, your gateway to exploring stunning travel destinations around the world. Discover curated itineraries and find your perfect gateway, and receive personalized recommendations tailored to your travel style and budget!</p>
        //         </div>
        //         <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
        //             <div class ="row">
        //             <h2>Login</h2>
        //             <form class="form-group" onSubmit={handleSubmit}>
        //                 <div className=" row">
        //                     <label htmlFor="email">Email</label>
        //                     <input class="form__input"
        //                         type="email"

        //                         name="email"
        //                         value={formData.email}
        //                         onChange={handleChange}
        //                         placeholder="Email"
        //                     />
        //                     {errors.email && <div className="text-danger">{errors.email}</div>}
        //                 </div>

        //                 <div className="row">
        //                     <label htmlFor="password">Password</label>
        //                     <input class="form__input"
        //                         type="password"

        //                         name="password"
        //                         value={formData.password}
        //                         onChange={handleChange}
        //                         placeholder="Password"
        //                     />
        //                     {errors.password && <div className="text-danger">{errors.password}</div>}
        //                 </div>
        //                 {errors.apiError && <span className='text-danger'>{errors.apiError}</span>}
        //                 <div className='row'>
        //                 <button type="submit" className="btn">Login</button>
        //                 </div>
        //             </form>
        //             <div className='row'>
        //             <p>Don't have an account? <span className="linking" onClick={() => navigate('/signup')}>Signup</span></p></div>
        //         </div>
        //     </div>
        // </div>
        // </div>



        <div className='login-container bo'>
            <div className='left-side'>

                <h1>Travel Tales</h1>
                <p>Welcome to Travel Tales, your gateway to exploring stunning travel destinations around the world. Discover curated itineraries and find your perfect gateway, and receive personalized recommendations tailored to your travel style and budget!</p>
            </div>
            <div className='right-side'>
                <h1>Login</h1>
                <form style={{ position: 'relative' }} onSubmit={handleSubmit}>
                    <fieldset className="custom-fieldset">
                        <legend>Email Id</legend>
                        <div className="input-container">
                            <i className="bi bi-envelope-at-fill icon"></i> {/* Add 'icon' class */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <legend>Password</legend>
                        <div className="input-container">
                            <i className="bi bi-key-fill icon"></i> {/* Add 'icon' class */}
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </fieldset>
                    <div className="btn-container">
                        <button type="submit">LOGIN</button>
                    </div>
                    <h5>
                        <p>
                            Don't have an account?{' '}
                            <span className="linking" onClick={() => navigate('/signup')}>
                                Signup
                            </span>
                        </p>
                    </h5>
                </form>

            </div>
        </div>
    );
};

export default Login;
