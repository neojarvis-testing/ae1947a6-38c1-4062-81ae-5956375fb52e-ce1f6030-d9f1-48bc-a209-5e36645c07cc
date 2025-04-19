import React, { useState, useEffect } from 'react';
import GuideNavbar from '../GuideComponents/GuideNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import axios from 'axios';
import baseUrl from '../apiConfig';
import TravellerNavbar from '../TravellerComponents/TravellerNavbar';

const HomePage = () => {
    const username = localStorage.getItem('username') || 'Guest';
    const role = localStorage.getItem('role') || 'Traveller';

    const [homePage, setHomePage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorOccurred, setErrorOccurred] = useState(false);

    const fetchHomePage = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/home`);
            console.log('Response:', response.data);
            setHomePage(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching home page:', error);
            setErrorOccurred('Failed to load HomePage');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHomePage();
    }, []);

    return (
        <div className="home-page">
            {role === "Traveller" ? <TravellerNavbar username={username} role={role} /> : <GuideNavbar username={username} role={role} />}
            <main className="container">
                <div className="welcome-section row align-items-center">
                    <div className="col-md-12 image-container">
                        <div className="strip-background">
                            <div className="centered-title">Travel Tales</div>
                        </div>
                    </div>
                </div>
            </main>
            <div>
                <p className="wel">Welcome to Travel Tales, your gateway to exploring amazing travel destinations around the world. Discover curated itineraries and find your perfect getaway, and receive personalized recommendations tailored to your travel style and budget.</p>
            </div>
            <footer className="text-center mt-4">
                <p>Contact Us</p>
                <p>Email: example@travelcorp.com</p>
                <p>Phone: 012-345-6780</p>
            </footer>
        </div>
    );
};

export default HomePage;
