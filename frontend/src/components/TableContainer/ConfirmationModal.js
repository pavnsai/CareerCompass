import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ show, onHide, onConfirm, bodyContent }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onHide}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Confirmation</h2>
                    <button className="close-button" onClick={onHide}>&times;</button>
                </div>
                <div className="modal-body">
                    {bodyContent}
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
                    <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;