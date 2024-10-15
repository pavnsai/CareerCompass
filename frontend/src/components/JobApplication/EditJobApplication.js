import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './EditJobApplication.css';
import {careerCompassApi} from "../Utils/CareerCompassApi";
import {urlPaths} from "../../Constants";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import Select from 'react-select';
import Loader from "../Utils/Loader";
import {DayPicker} from 'react-day-picker';
import {format} from 'date-fns';
import 'react-day-picker/dist/style.css';
import {parseISO} from 'date-fns';

const EditJobApplication = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const rowData = location.state?.rowData;
    const allTags = JSON.parse(localStorage.getItem('allTags'))
    const allTagsArray = allTags.map(tag => tag.name);
    const tagNames = rowData.jobTags.map(tag => tag.name);
    const unarchivedJobs = JSON.parse(localStorage.getItem('unArchivedJobs'))
    const [tags, setTags] = useState(tagNames || []);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        starred: Yup.boolean(),
        companyName: Yup.string().required('Company Name is required'),
        jobUrl: Yup.string().url('Invalid URL').required('Job URL is required'),
        role: Yup.string().required('Role is required'),
        appliedOn: Yup.date().required('Applied On date is required'),
        status: Yup.string().required('Status is required'),
        notes: Yup.string(),
    });

    const applicationStatus = ['YetToApply', 'Applied', 'WaitingToHearBack', 'NeedToFollowUp', 'Accepted', 'Rejected'];
    const getTagIds = (tags) => {
        return tags.map(tagName => {
            const tag = allTags.find(t => t.name === tagName);
            return tag ? tag.id : null;
        });
    }
    const handleSubmit = async (values) => {
        setIsLoading(true);
        const storedUser = JSON.parse(localStorage.getItem('userDetails'));
        const userJson = JSON.parse(localStorage.getItem('user'));
        const updatedData = {
            userId: storedUser.userId,
            company: values.companyName,
            position: values.role,
            status: values.status,
            applicationDate: values.appliedOn,
            companyUrl: values.jobUrl,
            notes: values.notes,
            jobTagIds: getTagIds(tags),
            starred: values.starred,
            id: rowData.id
        }
        const response = await careerCompassApi.putApiCall(userJson, urlPaths.UPDATE_JOB_APPLICATION, updatedData);
        const unarchivedJobs = await careerCompassApi.getApiCall(userJson, urlPaths.GET_UNARCHIVED_JOB_APPLICATIONS + storedUser.userId);
        localStorage.setItem('unArchivedJobs', JSON.stringify(unarchivedJobs.data));
        navigate('/jobs');
        setIsLoading(false);
    };

    return (
        <div className="add-job-application-container">
            <div className="add-job-application">
                {isLoading && <Loader/>}
                <h2>Edit Job Application</h2>
                <Formik
                    initialValues={{
                        starred: rowData.starred || false,
                        companyName: rowData.company || '',
                        jobUrl: rowData.companyUrl || '',
                        role: rowData.position || '',
                        appliedOn: rowData.applicationDate ? parseISO(rowData.applicationDate) : null,
                        status: rowData.status || '',
                        notes: rowData.notes || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({values, setFieldValue, errors, touched}) => (
                        <Form>
                            <div className="form-star">
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
                            <div className="form-row">
                                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditJobApplication;