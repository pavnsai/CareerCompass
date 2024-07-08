import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './EditTagModal.css';

const EditTagModal = ({ show, onHide, onConfirm, tag, editedTagName, setEditedTagName }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tag: {tag}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="tag-change">
                    <span className="old-tag">{tag}</span>
                    <span className="arrow">&rarr;</span>
                    <input
                        type="text"
                        value={editedTagName}
                        onChange={(e) => setEditedTagName(e.target.value)}
                        className="new-tag-input"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => onConfirm(tag, editedTagName)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTagModal;