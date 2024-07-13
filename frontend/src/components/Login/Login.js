import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import {Button, Form, Alert} from 'react-bootstrap';
import {useAuth} from '../Context/AuthContext';
import {careerCompassApi} from '../Utils/CareerCompassApi';
import {parseJwt, handleLogError} from '../Utils/Helpers';
import {BsFillEyeFill, BsFillEyeSlashFill} from 'react-icons/bs';
import './Login.css';
import {urlPaths} from "../../Constants";
import {Formik} from 'formik';
import * as Yup from 'yup';
import Loader from "../Utils/Loader";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

function Login() {
    const Auth = useAuth();
    const isLoggedIn = Auth.userIsAuthenticated();
    const navigate = useNavigate();
    const location = useLocation();
    const {state} = location;
    useEffect(() => {
        if (state) {
            setEmail(state.email || '');
            setPassword(state.password || '');
            if (state.email && state.password) {
                handleSubmit({email: state.email, password: state.password}, {setSubmitting: () => {}});
            }
        } else {
            setEmail('');
            setPassword('');
        }
    }, [state]);
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/jobs');
        }
    }, []);
    const handleSubmit = async (values, {setSubmitting}) => {
        const {email, password} = values;
        try {
            setIsLoading(true);
            const response = await careerCompassApi.postApiCallWithoutToken(urlPaths.AUTHENTICATE, {
                username: email,
                password
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
            const [getAllTags, unarchivedJobs, archivedJobs] = await Promise.all([
                careerCompassApi.getApiCall(userJson, urlPaths.GET_ALL_TAGS + storedUser.userId),
                careerCompassApi.getApiCall(userJson, urlPaths.GET_UNARCHIVED_JOB_APPLICATIONS + storedUser.userId),
                careerCompassApi.getApiCall(userJson, urlPaths.GET_ARCHIVED_JOB_APPLICATIONS + storedUser.userId)
            ]);
            localStorage.setItem('allTags', JSON.stringify(getAllTags.data));
            localStorage.setItem('unArchivedJobs', JSON.stringify(unarchivedJobs.data));
            localStorage.setItem('archivedJobs', JSON.stringify(archivedJobs.data));
            navigate('/jobs');
            setIsLoading(false);

        } catch (error) {
            handleLogError(error);
            setIsError(true);
            setIsLoading(false);
        }
    };


    return (
        <div className="login-container">
            {isLoading && <Loader/>}
            <Formik
                enableReinitialize={true}
                initialValues={{email: email, password: password}}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting}) => (
                    <Form onSubmit={handleSubmit} className="login-form">
                        <h2>Login</h2>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    handleEmailChange(e);
                                    setFieldValue('email', e.target.value);
                                }}
                                onBlur={handleBlur}
                                isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 password-group">
                            <div className="label-and-forgot">
                                <Form.Label>Password</Form.Label>
                                <NavLink to="/forgot-password" className="forgot-password-link">
                                    Forgot Password?
                                </NavLink>
                            </div>
                            <div className="password-input">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={(e) => {
                                        handlePasswordChange(e);
                                        setFieldValue('password', e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                    isInvalid={touched.password && errors.password}
                                />
                                <div className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <BsFillEyeSlashFill/> : <BsFillEyeFill/>}
                                </div>
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="btn-block" disabled={isSubmitting}>
                            Login
                        </Button>
                        <div className="mt-3 text-center">
                            Don't have an account?{' '}
                            <NavLink to="/signup">
                                Sign Up
                            </NavLink>
                        </div>
                        {isError && <Alert variant="danger" className="mt-3">The email or password provided is
                            incorrect!</Alert>}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
