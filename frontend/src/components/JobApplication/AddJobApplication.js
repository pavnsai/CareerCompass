import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './AddJobApplication.css';
import {careerCompassApi} from "../Utils/CareerCompassApi";
import {urlPaths} from "../../Constants";
import {useNavigate} from 'react-router-dom';
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import Select from 'react-select';
import Loader from "../Utils/Loader";
import {DayPicker} from 'react-day-picker';
import {format} from 'date-fns';
import 'react-day-picker/dist/style.css';


const AddJobApplication = () => {
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const applicationStatus = ['YetToApply', 'Applied', 'WaitingToHearBack', 'NeedToFollowUp', 'Accepted', 'Rejected'];
    const allTags = JSON.parse(localStorage.getItem('allTags'))
    const allTagsArray = allTags.map(tag => tag.name);
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));
    const userJson = JSON.parse(localStorage.getItem('user'));
    const [isLoading, setIsLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const validationSchema = Yup.object().shape({
        starred: Yup.boolean(),
        companyName: Yup.string().required('Company Name is required'),
        jobUrl: Yup.string().url('Invalid URL').required('Job URL is required'),
        role: Yup.string().required('Role is required'),
        appliedOn: Yup.date().required('Applied On date is required'),
        status: Yup.string().required('Status is required'),
        notes: Yup.string(),
    });
    const getTagIds = (tags) => {
        return tags.map(tagName => {
            const tag = allTags.find(t => t.name === tagName);
            return tag ? tag.id : null;
        });
    }
    const handleSubmit = async (values, {resetForm}) => {
        setIsLoading(true);
        const jobApplication = {
            userId: storedUser.userId,
            company: values.companyName,
            position: values.role,
            status: values.status,
            applicationDate: values.appliedOn,
            companyUrl: values.jobUrl,
            notes: values.notes,
            jobTagIds: getTagIds(tags),
            starred: values.starred
        }
        const response = await careerCompassApi.postApiCall(userJson, urlPaths.CREATE_JOB_APPLICATION, jobApplication);
        const unarchivedJobs = await careerCompassApi.getApiCall(userJson, urlPaths.GET_UNARCHIVED_JOB_APPLICATIONS + storedUser.userId);
        localStorage.setItem('unArchivedJobs', JSON.stringify(unarchivedJobs.data));
        resetForm();
        setTags([]);
        navigate('/jobs');
        setIsLoading(false);
    };

    return (
        <div className="add-job-application-container">
            <div className="add-job-application">
                {isLoading && <Loader/>}
                <h2>Add Job Application</h2>
                <Formik
                    initialValues={{
                        starred: false,
                        companyName: '',
                        jobUrl: '',
                        role: '',
                        appliedOn: '',
                        status: '',
                        notes: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({values, setFieldValue, errors, touched}) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="starred">Starred</label>
                                {values.starred ? (
                                    <AiFillStar
                                        className="action-icon action-star"
                                        onClick={() => setFieldValue('starred', !values.starred)}
                                    />
                                ) : (
                                    <AiOutlineStar
                                        className="action-icon"
                                        onClick={() => setFieldValue('starred', !values.starred)}
                                    />
                                )}
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="companyName">Company Name</label>
                                    <Field type="text" id="companyName" name="companyName"
                                           className={errors.companyName && touched.companyName ? 'error' : ''}/>
                                    <ErrorMessage name="companyName" component="div" className="error-message"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <Field type="text" id="role" name="role"
                                           className={errors.role && touched.role ? 'error' : ''}/>
                                    <ErrorMessage name="role" component="div" className="error-message"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="jobUrl">Job URL</label>
                                <Field type="text" id="jobUrl" name="jobUrl"
                                       className={errors.jobUrl && touched.jobUrl ? 'error' : ''}/>
                                <ErrorMessage name="jobUrl" component="div" className="error-message"/>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="appliedOn">Applied On</label>
                                    <div className="date-picker-wrapper">
                                        <div
                                            className="date-display"
                                            onClick={() => setShowDatePicker(!showDatePicker)}
                                        >
                                            {values.appliedOn ? format(values.appliedOn, 'MM-dd-yyyy') : 'Select a date'}
                                        </div>
                                        {showDatePicker && (
                                            <DayPicker
                                                mode="single"
                                                selected={values.appliedOn}
                                                onSelect={(date) => {
                                                    setFieldValue('appliedOn', date);
                                                    setShowDatePicker(false);
                                                }}
                                                captionLayout="dropdown-buttons"
                                                fromYear={1900}
                                                toYear={2100}
                                            />
                                        )}
                                    </div>
                                    {/*<DatePicker*/}
                                    {/*    id="appliedOn"*/}
                                    {/*    selected={values.appliedOn}*/}
                                    {/*    onChange={(date) => setFieldValue('appliedOn', date)}*/}
                                    {/*    className={errors.appliedOn && touched.appliedOn ? 'error' : ''}*/}
                                    {/*    dateFormat="MM-dd-yyyy"*/}
                                    {/*    placeholderText="Select a date"*/}
                                    {/*/>*/}
                                    {/*<Field type="date" id="appliedOn" name="appliedOn"*/}
                                    {/*       className={errors.appliedOn && touched.appliedOn ? 'error' : ''}/>*/}
                                    <ErrorMessage name="appliedOn" component="div" className="error-message"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <Field as="select" id="status" name="status"
                                           className={errors.status && touched.status ? 'error' : ''}>
                                        <option value="">Select Status</option>
                                        {applicationStatus.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="status" component="div" className="error-message"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tags">Tags</label>
                                <Select
                                    id="tags"
                                    isMulti
                                    options={allTagsArray.map((tag) => ({value: tag, label: tag}))}
                                    value={tags.map((tag) => ({value: tag, label: tag}))}
                                    onChange={(selectedOptions) => setTags(selectedOptions.map((option) => option.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="notes">Notes</label>
                                <Field as="textarea" id="notes" name="notes"/>
                            </div>
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddJobApplication;