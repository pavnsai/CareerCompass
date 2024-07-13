import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Alert } from 'react-bootstrap';
import { careerCompassApi } from '../Utils/CareerCompassApi';
import { urlPaths } from "../../Constants";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import './ResetPassword.css';

const PasswordResetSchema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function ResetPassword() {
    const { email, hash } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const notify = (message) => toast(message);

    const handleSubmit = async (values, { setSubmitting }) => {
        const { password } = values;
        try {
            setIsLoading(true);
            setIsError(false);
            // const response = await careerCompassApi.postApiCallWithoutToken(urlPaths.RESET_PASSWORD, {
            //     email,
            //     verificationChallenge: hash,
            //     verificationStrategyType: 'password',
            //     newPassword: password
            // });
            // if (response.statusCode === 200 && response.data.status === 'Success') {
            //     notify('Password reset successful. Redirecting to login page...');
            //     setTimeout(() => {
            //         navigate('/login');
            //     }, 2000);
            // } else {
            //     notify('Password reset failed. Please try again.');
            //     setIsError(true);
            // }
            setIsLoading(false);
            setSubmitting(false);
        } catch (error) {
            console.error('Error resetting password:', error);
            setIsError(true);
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="password-reset-container">
            <ToastContainer />
            <div className="password-reset-form">
                <h2>Reset Password</h2>
                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={PasswordResetSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <div className="password-input">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.password && errors.password}
                                    />
                                    <div className="password-toggle" onClick={togglePasswordVisibility}>
                                        {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                    </div>
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <div className="password-input">
                                    <Form.Control
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.confirmPassword && errors.confirmPassword}
                                    />
                                    <div className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                                        {showConfirmPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                    </div>
                                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="btn-block" disabled={isSubmitting}>
                                Reset Password
                            </Button>
                            {isError && <Alert variant="danger" className="mt-3">Failed to reset password. Please try again.</Alert>}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ResetPassword;
