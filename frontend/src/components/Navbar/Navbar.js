import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Container, Navbar as BootstrapNavbar, Nav} from 'react-bootstrap';
import {useAuth} from '../Context/AuthContext';
import './Navbar.css';

function Navbar({onSignupClick}) {
    const {getUser, userIsAuthenticated, userLogout} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const logout = () => {
        userLogout();
    };

    const enterMenuStyle = () => {
        return userIsAuthenticated() ? {display: 'none'} : {display: 'block'};
    };
    const handleGuestClick = () => {
        navigate('/login', {state: {email: "fireflies186@gmail.com", password: "Admin@123"}});
    };
    const logoutMenuStyle = () => {
        return userIsAuthenticated() ? {display: 'block'} : {display: 'none'};
    };


    const getUserName = () => {
        const user = getUser();
        return user ? user.data.name : '';
    };

    return (
        <BootstrapNavbar expand="lg" className="custom-navbar">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/">Career-Compass</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav"/>
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    {userIsAuthenticated() && <Nav className="me-auto">
                        <Nav.Link as={Link} to="/jobs"
                                  className={location.pathname === '/jobs' ? 'active' : ''}>Job Applications</Nav.Link>
                        <Nav.Link as={Link} to="/archivedJobs"
                                  className={location.pathname === '/archivedJobs' ? 'active' : ''}>Archived Job
                            Applications</Nav.Link>
                        <Nav.Link as={Link} to="/addJobApplication"
                                  className={location.pathname === '/addJobApplication' ? 'active' : ''}
                        >Add Job Application</Nav.Link>
                        <Nav.Link as={Link} to="/addTags"
                                  className={location.pathname === '/addTags' ? 'active' : ''}
                        >Add/Update Tags</Nav.Link>
                    </Nav>}
                    <Nav className={"ms-auto"}>
                        {userIsAuthenticated() ? (
                            <>
                                <Nav.Item className="user-name" style={logoutMenuStyle()}>
                                    {`${getUserName()}`}
                                </Nav.Item>
                                <button as={Link} to="/" onClick={logout} style={logoutMenuStyle()}
                                        className="logout-button">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleGuestClick} style={enterMenuStyle()} className="login-button">
                                    Guest
                                </button>
                                <Link to="/login" style={{textDecoration: 'none'}}>
                                    <button as={Link} to="/login"
                                            onClick={onSignupClick}
                                            style={enterMenuStyle()}
                                            className="login-button">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup" style={{textDecoration: 'none'}}>
                                    <button as={Link} to="/signup" onClick={onSignupClick} style={enterMenuStyle()}
                                            className="signup-button">
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