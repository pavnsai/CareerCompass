import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ViewJobApplication.css';
import {AiFillStar, AiOutlineStar} from "react-icons/ai";

const ViewJobApplication = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const rowData = location.state?.rowData;
    const showEdit=location.state?.showEdit??true;
    const tagNames = rowData.jobTags.map(tag => tag.name);

    const handleEditClick = () => {
        navigate('/edit', { state: { rowData } });
    };

    return (
        <div className="row-details-container">
        <div className="row-details">
            <h2>Job Application Details</h2>
            <div className="form-group">
                    Starred:<space> </space>
                {rowData.starred ? (
                    <AiFillStar
                        className="action-icon action-star"
                    />
                ) : (
                    <AiOutlineStar
                        className="action-icon"
                    />
                )}
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Company Name:</label>
                    <span>{rowData.company}</span>
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <span>{rowData.position}</span>
                </div>
            </div>
            <div className="form-group">
                <label>Job URL:</label>
                <span>{rowData.companyUrl}</span>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Applied On:</label>
                    <span>{rowData.applicationDate}</span>
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <span>{rowData.status}</span>
                </div>
            </div>
            <div className="form-group">
                <label>Tags:</label>
                <div className="tags-container">
                    {tagNames.map((tag, index) => (
                        <span key={index} className={`added-tag tag-${index % 4}`}>{tag}</span>
                    ))}
                </div>
            </div>
            <div className="form-group">
                <label>Notes:</label>
                <p>{rowData.notes}</p>
            </div>
            {showEdit&&<button className="edit-button" onClick={handleEditClick}>Edit</button>}
        </div>
        </div>
    );
};

export default ViewJobApplication;