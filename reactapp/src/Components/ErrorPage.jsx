import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon">⚠️</div>
                <h1>Oops! Something Went Wrong</h1>
                <p>Please try again later.</p>
            </div>
        </div>
    );
};

export default ErrorPage;
