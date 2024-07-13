import React from 'react';
import {useNavigate} from 'react-router-dom';
import './CareerCompass.css';

function CareerCompass() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="career-compass-container">
            <h1>Welcome to CareerCompass</h1>
            <p>CareerCompass is your go-to tool for managing and tracking job applications seamlessly. Simplify your job
                search process with personalized tags, comprehensive application tracking, and secure data
                management.</p>
            <div className="features-technologies">
                <div className="card">
                    <h2>Key Features:</h2>
                    <ul>
                        <li>User Registration and Secure Login</li>
                        <li>Personalized Tag Management</li>
                        <li>Detailed Job Application Records</li>
                        <li>Effective Job Application Tracking</li>
                        <li>Notification Management (Email, SMS, Call)</li>
                        <li>REST API for Data Access</li>
                    </ul>
                </div>
                <div className="card">
                    <h2>Technologies Used:</h2>
                    <ul>
                        <li>React for Frontend Development</li>
                        <li>Java with SpringBoot for Backend Development</li>
                        <li>MySQL for Database Management</li>
                    </ul>
                </div>
            </div>
            <button className="career-compass-button" onClick={handleGetStarted}>Get Started</button>
            <div className="resource-link">
                <a href="/Project%207%20Update.pdf" target="_blank" rel="noopener noreferrer">
                    View Resource
                </a>
            </div>
        </div>
    );
}

export default CareerCompass;
