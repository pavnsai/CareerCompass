import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './CareerCompass.css';
import {useAuth} from "../Context/AuthContext";

function CareerCompass() {
    const navigate = useNavigate();
    const { userIsAuthenticated} = useAuth();
    const handleGetStarted = () => {
        navigate('/login');
    };
    const enterMenuStyle = () => {
        return userIsAuthenticated() ? {display: 'none'} : {display: 'block'};
    };

    return (
        <div className="career-compass-container">
            <div className="header-section">
                <div className="header-content">
                    <h1>Welcome to CareerCompass</h1>
                    <p>CareerCompass is a web-based application designed to simplify and streamline the job search process.
                        Our user-friendly tool helps job seekers efficiently manage their applications, track progress, and stay
                        organized throughout their career journey.</p>
                </div>
                    <div className="button-container">
                        <button className="career-compass-button" style={enterMenuStyle()} onClick={handleGetStarted}>Get Started</button>
                    </div>
            </div>
            <div className="content-wrapper">
                <div className="features-technologies">
                    <div className="card">
                        <h2>Key Features:</h2>
                        <ul>
                            <li>User Registration and Secure Login</li>
                            <li>Personalized Tag Management</li>
                            <li>Detailed Job Application Records</li>
                            <li>Effective Job Application Tracking</li>
                            <li>Starring and Archiving Applications</li>
                            <li>Notification Management (Email)</li>
                            <li>REST API for Data Access</li>
                        </ul>
                        <p></p>
                        <p></p>
                    </div>
                    <div className="card">
                        <h2>Design Patterns:</h2>
                        <ul>
                            <li>Singleton Pattern</li>
                            <li>Factory Pattern</li>
                            <li>Strategy Pattern</li>
                            <li>Facade Pattern</li>
                            <li>Builder Pattern</li>
                        </ul>
                        <p>Detailed class relationships can be found here:</p>
                        <p></p>
                        <button className="pdf-button"
                                onClick={() => window.open('/Project%207%20Update.pdf', '_blank')}>
                            View UML PDF
                        </button>
                    </div>
                    <div className="card">
                        <h2>Architecture:</h2>
                        <ul>
                            <li><b>Frontend:</b> React-based SPA on AWS S3 and CloudFront</li>
                            <li><b>Backend:</b> Java Spring Boot on AWS Lambda</li>
                            <li><b>Database:</b> Amazon RDS MySQL instance</li>
                            <li>API Gateway for RESTful requests</li>
                        </ul>
                        {/*<p></p>*/}
                        <p></p>
                        <p></p>
                        <p></p>
                        <button className="pdf-button"
                                onClick={() => window.open('/CareerCompassArchitecture.pdf', '_blank')}>
                            View Deployment PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CareerCompass;