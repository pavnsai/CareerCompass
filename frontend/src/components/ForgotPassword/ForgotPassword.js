import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Form, Button, Alert} from 'react-bootstrap';
import {careerCompassApi} from '../Utils/CareerCompassApi';
import {handleLogError} from '../Utils/Helpers';
import {urlPaths} from "../../Constants";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';
import {useNavigate} from "react-router-dom";

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});

function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values, {setSubmitting}) => {
        const {email} = values;
        try {
            setIsLoading(true);
            setIsError(false);
            // await careerCompassApi.postApiCallWithoutToken(urlPaths.FORGOT_PASSWORD, {email});
            toast.success('Password reset email sent successfully!. Redirecting to login page..');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
            setIsLoading(false);
            setSubmitting(false);
        } catch (error) {
            handleLogError(error);
            setIsError(true);
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <Formik
                initialValues={{email: ''}}
                validationSchema={ForgotPasswordSchema}
                onSubmit={handleSubmit}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <Form onSubmit={handleSubmit} className="forgot-password-form">
                        <h2>Forgot Password</h2>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="btn-block" disabled={isSubmitting}>
                            Submit
                        </Button>
                        {isError &&
                            <Alert variant="danger" className="mt-3">Failed to send password reset email. Please try
                                again.</Alert>}
                    </Form>
                )}
            </Formik>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;
