import React, { useEffect, useState } from 'react';
import { NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { careerCompassApi } from '../Utils/CareerCompassApi';
import { handleLogError } from '../Utils/Helpers';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { urlPaths } from '../../Constants';
import Loader from "../Utils/Loader";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import './Signup.css';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .notRequired(),
});

function Signup() {
    const Auth = useAuth();
    const isLoggedIn = Auth.userIsAuthenticated();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(true);
    const [showVerification, setShowVerification] = useState(false);
    const [showNothing, setShowNothing] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [verificationMethod, setVerificationMethod] = useState('');
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [wrongOtpAttempts, setWrongOtpAttempts] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const notify = (message) => toast(message);
    const location = useLocation();
    const message = location.state?.email;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (message) {
            setEmail(message);
            handleVerification('email', message);
        }
    }, [message]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleVerification = async (method, email) => {
        setIsLoading(true);
        setVerificationMethod(method);
        const response = await careerCompassApi.postApiCallWithoutToken(urlPaths.SEND_VERIFICATION, {
            email,
            verificationStrategyType: method,
        });
        let errorMsg;
        if (response.statusCode !== 200) {
            errorMsg = response.message;
            setToastMsg(errorMsg);
            notify(errorMsg);
            setShowForm(false);
            setShowVerification(false);
            setShowOtp(false);
            setShowNothing(true);
        } else {
            let message;
            switch (method) {
                case 'email':
                    message = 'Verification email has been sent';
                    setToastMsg(message);
                    notify(message);
                    setShowForm(false);
                    setShowVerification(false);
                    setShowOtp(false);
                    setShowNothing(true);
                    break;
                case 'call':
                    message = 'You will receive OTP via call shortly';
                    setToastMsg(message);
                    notify(message);
                    setShowForm(false);
                    setShowVerification(false);
                    setShowOtp(true);
                    break;
                default:
                    message = 'OTP has been sent to your number';
                    setToastMsg(message);
                    notify(message);
                    setShowForm(false);
                    setShowVerification(false);
                    setShowOtp(true);
                    break;
            }

        }
        setIsLoading(false);
    };

    const handleOtpSubmit = async (values) => {
        setIsLoading(true);
        const response = await careerCompassApi.postApiCallWithoutToken(urlPaths.VALIDATE_VERIFICATION, {
            email,
            verificationStrategyType: verificationMethod,
            verificationChallenge: otp,
        });

        if (response.statusCode === 200 && response.data.status === 'Success') {
            notify('Verification is successful. Redirecting to login page..');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setWrongOtpAttempts((prevAttempts) => prevAttempts + 1);
            if (wrongOtpAttempts < 2) {
                notify('Oops, you have entered the wrong OTP. Please enter a valid OTP.');
            } else {
                notify("You have reached the maximum limit of OTP's. Please try again using below verification methods.");
                setOtp('');
                setWrongOtpAttempts(0);
                setShowForm(false);
                setShowVerification(true);
                setShowOtp(false);
            }
        }
        setIsLoading(false);
    };

    const handleRegisterSubmit = async (values, { setSubmitting }) => {
        const { firstName, lastName, password, email, phoneNumber } = values;
        const user = { firstName, lastName, password, email, phoneNumber: '+1' + phoneNumber, verifyByPhoneNumber: true };

        try {
            setIsLoading(true);
            const response = await careerCompassApi.getApiCallWithoutToken(urlPaths.CHECK_USER_REGISTRATION_STATUS + email);
            if (response.statusCode === 200) {
                if (response.data.userAccountPresent && response.data.accountVerified) {
                    notify(`Account with email:${email} already present, redirecting to Login page..`);
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else if (!response.data.userAccountPresent && !response.data.accountVerified) {
                    const response = await careerCompassApi.postApiCallWithoutToken(urlPaths.SIGNUP, user);
                } else {
                    notify(`Account with the email:${email} was already present but hasn't verified yet. Please verify`);
                }
            } else {
                notify("Something went wrong. Please try again later.");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }

            setShowOtp(false);
            setShowForm(false);
            setShowVerification(true);
            setIsLoading(false);
        } catch (error) {
            handleLogError(error);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                let errorMessage = 'Invalid fields';
                if (errorData.status === 409) {
                    errorMessage = errorData.message;
                } else if (errorData.status === 400) {
                    errorMessage = errorData.errors[0].defaultMessage;
                }
                notify(errorMessage);
            }
            setIsLoading(false);
        }
        setSubmitting(false);
    };

    if (isLoggedIn) {
        return <Navigate to='/' />;
    }

    return (
        <div className="signup-container">
            <ToastContainer />
            {isLoading && <Loader />}
            {showVerification && (
                <div className="verification-options">
                    <Button variant="primary" className="btn-block" onClick={() => handleVerification('email', email)}>
                        Verify by Email
                    </Button>
                    <span className="divider-text">or</span>
                    <Button variant="primary" className="btn-block" onClick={() => handleVerification('sms', email)}>
                        Verify by SMS
                    </Button>
                    <span className="divider-text">or</span>
                    <Button variant="primary" className="btn-block" onClick={() => handleVerification('call', email)}>
                        Verify by Call
                    </Button>
                </div>
            )}
            {showOtp && (
                <Formik
                    initialValues={{ otp: '' }}
                    onSubmit={handleOtpSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit} className="otp-form">
                            <Form.Group className="mb-3">
                                <Form.Label>Please Enter the OTP:</Form.Label>
                                <Field as={Form.Control} type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="btn-block">
                                Verify
                            </Button>
                        </Form>
                    )}
                </Formik>
            )}
            {showForm && <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    phoneNumber: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={handleRegisterSubmit}
            >
                {({ handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit} className="signup-form">
                        <h2>Sign up</h2>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name*</Form.Label>
                            <Field as={Form.Control} type="text" name="firstName" isInvalid={touched.firstName && !!errors.firstName} />
                            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name*</Form.Label>
                            <Field as={Form.Control} type="text" name="lastName" isInvalid={touched.lastName && !!errors.lastName} />
                            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password*</Form.Label>
                            <div className="password-input">
                                <Field as={Form.Control} type={showPassword ? "text" : "password"} name="password" isInvalid={touched.password && !!errors.password} />
                                <div className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                </div>
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password*</Form.Label>
                            <div className="password-input">
                                <Field as={Form.Control} type={showConfirmPassword ? "text" : "password"} name="confirmPassword" isInvalid={touched.confirmPassword && !!errors.confirmPassword} />
                                <div className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                </div>
                                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email*</Form.Label>
                            <Field as={Form.Control} type="email" name="email" isInvalid={touched.email && !!errors.email} />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Field as={Form.Control} type="tel" name="phoneNumber" isInvalid={touched.phoneNumber && !!errors.phoneNumber} />
                            <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="btn-block">
                            Signup
                        </Button>
                        <div className="mt-3 text-center">
                            Already have an account?{' '}
                            <NavLink to="/login">
                                Login
                            </NavLink>
                        </div>
                    </Form>
                )}
            </Formik>
            }
            {showNothing && <div className="email-toast">
                {toastMsg}</div>}
        </div>
    );
}

export default Signup;
