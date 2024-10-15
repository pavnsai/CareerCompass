import React from 'react';
import './EditTagModal.css';

const EditTagModal = ({ show, onHide, onConfirm, tag, editedTagName, setEditedTagName }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onHide}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Edit Tag: {tag}</h2>
                    <button className="close-button" onClick={onHide}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="tag-change">
                        <span className="old-tag">{tag}</span>
                        <span className="arrow">&rarr;</span>
                        <input
                            type="text"
                            value={editedTagName}
                            onChange={(e) => setEditedTagName(e.target.value)}
                            className="new-tag-input"
                            placeholder="Enter new tag name"
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
                    <button
                        className="btn btn-primary"
                        onClick={() => onConfirm(tag, editedTagName)}
                        disabled={!editedTagName.trim()}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTagModal;