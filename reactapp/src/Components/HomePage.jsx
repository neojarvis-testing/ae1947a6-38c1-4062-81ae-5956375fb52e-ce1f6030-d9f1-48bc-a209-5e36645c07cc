import React from 'react';
import GuideNavbar from '../GuideComponents/GuideNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
        <GuideNavbar />
        <main className="container">
            <div className="welcome-section row align-items-center">
                <div className="col-md-12 image-container">
                    <div className="strip-background">
                        <div className="centered-title">Travel Tales</div>
                    </div>
                </div>
            </div>
        </main>
        <div className="welcome-text text-center">
            <p>Welcome to Travel Tales, your gateway to exploring stunning travel destinations around the world.
             Discover curated itineraries and find your perfect getaway, and receive personalized recommendations tailored to your travel style and budget!</p>
        </div>
        <footer className="text-center mt-4">
            <p>Contact Us</p>
            <p>Email: example@example.com</p>
            <p>Phone: 123-456-7890</p>
        </footer>
    </div>
  );
};

export default HomePage;
