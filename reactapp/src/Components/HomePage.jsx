import React from 'react'
import GuideNavbar from '../GuideComponents/GuideNavbar'
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
        <GuideNavbar/>
        <main>
        <div className="welcome-section">
            <div className="image-container">
            <div className="centered-title">Travel Tales</div>
            </div>
            <div className="welcome-text">
                <p>Welcome to Travel Tales,your gateway to exploring stunning travel destination around the word.Discover curated itineraies and
                    find your perfect gateway,and receive personalized recommendations tailored to your style and budget!</p>
            </div>
        </div>
        </main>
        <footer>
            <p>Email: example@example.com</p>
            <p>Phone: +123 456 7890</p>
        </footer>
    </div>
  )
}

export default HomePage