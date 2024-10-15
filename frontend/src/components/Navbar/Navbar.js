import React, {useCallback, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Navbar as BootstrapNavbar, Nav, Spinner } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import './Navbar.css';
import {useCleanup} from "../Utils/CleanupContext";
import {careerCompassApi} from "../Utils/CareerCompassApi";
import {urlPaths} from "../../Constants";
import {parseJwt} from "../Utils/Helpers";
import Loader from "../Utils/Loader";

function Navbar({ onSignupClick }) {
    const Auth = useAuth();
    const { getUser, userIsAuthenticated, userLogout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const logout = () => {
        cleanup();
        userLogout();
    };
    const { cleanup } = useCleanup();
    const handleNavigation = () => {
        cleanup();
    };
    const enterMenuStyle = () => {
        return userIsAuthenticated() ? { display: 'none' } : { display: 'block' };
    };
    const handleGuestClick = async () => {
        cleanup();
        setIsLoading(true);
        const response = await careerCompassApi.postApiCallWithoutToken(urlPaths.AUTHENTICATE, {
            username: 'fireflies186@gmail.com',
            password:'123456'
        });
        localStorage.setItem('userDetails', JSON.stringify({
            userId: response.data.userId,
            firstName: response.data.firstName,
            email: response.data.email
        }))
        const {accessToken} = response.data;
        const data = parseJwt(accessToken);
        const authenticatedUser = {data, accessToken};
        Auth.userLogin(authenticatedUser);
        const userJson = JSON.parse(localStorage.getItem('user'));
        const storedUser = JSON.parse(localStorage.getItem('userDetails'));
        const getAllTags = await careerCompassApi.getApiCall(userJson, urlPaths.GET_ALL_TAGS + storedUser.userId);
        const unarchivedJobs = await careerCompassApi.getApiCall(userJson, urlPaths.GET_UNARCHIVED_JOB_APPLICATIONS + storedUser.userId);
        const archivedJobs = await careerCompassApi.getApiCall(userJson, urlPaths.GET_ARCHIVED_JOB_APPLICATIONS + storedUser.userId);
        localStorage.setItem('allTags', JSON.stringify(getAllTags.data));
        localStorage.setItem('unArchivedJobs', JSON.stringify(unarchivedJobs.data));
        localStorage.setItem('archivedJobs', JSON.stringify(archivedJobs.data));
        setIsLoading(false);
        navigate('/jobs');

    };
    const logoutMenuStyle = () => {
        return userIsAuthenticated() ? { display: 'block' } : { display: 'none' };
    };

    const getUserName = () => {
        const user = getUser();
        return user ? user.data.name : '';
    };

    return (
        <BootstrapNavbar expand="lg" className="custom-navbar">
            {isLoading && <Loader />}
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/" className="brand-name">
                    <img
                        src="/CareerCompass.jpeg"
                        alt="Career Compass Logo"
                        style={{height: '40px',width:'40px', marginRight: '10px',marginBottom:'6px'}}
                    />
                    Career-Compass
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav"/>
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    {userIsAuthenticated() && <Nav className="me-auto">
                        <Nav.Link as={Link} to="/jobs" onClick={() => handleNavigation()} className={location.pathname === '/jobs' ? 'active' : ''}>Job Applications</Nav.Link>
                        <Nav.Link as={Link} to="/archivedJobs" onClick={() => handleNavigation()} className={location.pathname === '/archivedJobs' ? 'active' : ''}>Archived Job Applications</Nav.Link>
                        <Nav.Link as={Link} to="/addJobApplication" onClick={() => handleNavigation()} className={location.pathname === '/addJobApplication' ? 'active' : ''}>Add Job Application</Nav.Link>
                        <Nav.Link as={Link} to="/addTags" onClick={() => handleNavigation()} className={location.pathname === '/addTags' ? 'active' : ''}>Add/Update Tags</Nav.Link>
                    </Nav>}
                    <Nav className="ms-auto">
                        {userIsAuthenticated() ? (
                            <>
                                <Nav.Item className="user-name" style={logoutMenuStyle()}>
                                    {`${getUserName()}`}
                                </Nav.Item>
                                <button onClick={logout} style={logoutMenuStyle()} className="logout-button">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleGuestClick} style={enterMenuStyle()} className="login-button">
                                        <span>Guest</span>
                                </button>
                                <Link to="/login" onClick={() => handleNavigation()}  style={{ textDecoration: 'none' }}>
                                    <button onClick={onSignupClick}  style={enterMenuStyle()} className="login-button">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup" onClick={() => handleNavigation()} style={{ textDecoration: 'none' }}>
                                    <button onClick={onSignupClick} style={enterMenuStyle()} className="signup-button">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar;
