import React from "react";
import './Footer.css'; // You can style the footer here

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white text-center py-4">
            <div className="container">
                <p className="mb-1">Created with heart by:</p>
                <div className="d-flex justify-content-around">
                    <div>
                        <strong>Sagar Swami Rao Kulkarni</strong> -
                        <a href="https://github.com/sagarswamiraokulkarni" target="_blank" rel="noopener noreferrer" className="footer-link"> GitHub</a> |
                        <a href="https://www.linkedin.com/in/sagarswamirao/" target="_blank" rel="noopener noreferrer" className="footer-link"> LinkedIn</a>
                    </div>
                    <div>
                        <strong>Pavan Sai Appari</strong> -
                        <a href="https://github.com/pavnsai" target="_blank" rel="noopener noreferrer" className="footer-link"> GitHub</a> |
                        <a href="https://www.linkedin.com/in/pavan1810/" target="_blank" rel="noopener noreferrer" className="footer-link"> LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
