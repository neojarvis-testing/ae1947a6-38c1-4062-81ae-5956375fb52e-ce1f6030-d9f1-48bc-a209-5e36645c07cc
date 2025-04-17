import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import './GuideNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutModel from './LogoutModel';

const GuideNavbar = () => {
    const [showLogoutModel, setShowLogoutModel] = useState(false);
    const handleLogoutClick = () => {
        setShowLogoutModel(true);
    };

    const handleCloseModel = () => {
        setShowLogoutModel(false);
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

                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

                            
                            {/* <li class="nav-item dropdown" 
                                    value={selectedOption}
                                    onChange={handleSelection}>
                                <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Place
                                </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="/PlaceForm">Add Place</a>
                                <a class="dropdown-item" href="/ViewPlace">View Place</a>
                                </div>
                            </li> */}

                            {/* <div class="collapse navbar-collapse" id="navbarNavDarkDropdown"
                                    value={selectedOption}
                                    onChange={handleSelection}>      
                                <ul class="navbar-nav">        
                                    <li class="nav-item dropdown">          
                                        <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">            
                                            Place          
                                        </button>          
                                        <ul class="dropdown-menu dropdown-menu-dark">            
                                            <li><a class="dropdown-item" href="/PlaceForm">Add Place</a></li>            
                                            <li><a class="dropdown-item" href="/ViewPlace">View Place</a></li>            
                                        </ul>        
                                    </li>      
                                </ul>    
                            </div> */}

                            {/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                                <div class="container-fluid" 
                                    value={selectedOption}
                                    onChange={handleSelection}>
                                    <a class="navbar-brand" href="/">Navbar</a>
                                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                                    <ul class="navbar-nav">
                                        <li class="nav-item dropdown">
                                        <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-dark">
                                            <li><a class="dropdown-item" href="/PlaceForm">Add Place</a></li>            
                                            <li><a class="dropdown-item" href="/ViewPlace">View Place</a></li> 
                                        </ul>
                                        </li>
                                    </ul>
                                    </div> */}
                            {/* </div>
                            </nav> */}

                            <div className="dropdown-container">
                                <select
                                    className="form-select"
                                >
                                    <option value="" disabled>
                                    Place
                                    </option>
                                    <option value="/PlaceForm">Add Place</option>
                                    <option value="/ViewPlace">View Place</option>
                                </select>
                                </div>
                            



                            <li className="nav-item"><Link className="nav-link" to="/profile">Demoguide/Guide</Link></li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light" onClick={handleLogoutClick}>Logout</button>
                                </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {showLogoutModel && <LogoutModel onClose={handleCloseModel} />}
        </div>
    );
};

export default GuideNavbar;
