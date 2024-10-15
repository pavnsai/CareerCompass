import React, {useState, useEffect} from 'react';
import './AddTags.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {careerCompassApi} from '../Utils/CareerCompassApi';
import {urlPaths} from '../../Constants';
import ConfirmationModal from '../TableContainer/ConfirmationModal';
import {AiOutlineEdit} from 'react-icons/ai';
import EditTagModal from './EditTagModal';
import Loader from '../Utils/Loader';

const AddTags = () => {
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));
    const userJson = JSON.parse(localStorage.getItem('user'));

    const existingTags = JSON.parse(localStorage.getItem('allTags'));
    const allTags = existingTags.map((tag) => tag.name);

    const [tags, setTags] = useState(allTags);
    const [newTag, setNewTag] = useState('');
    const [addedTags, setAddedTags] = useState([]);
    const [deletedTags, setDeletedTags] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [editingTag, setEditingTag] = useState(null);
    const [editedTagName, setEditedTagName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const updatedTags = JSON.parse(localStorage.getItem('allTags'));
        if (updatedTags) {
            const allTagsUpdated = updatedTags.map((tag) => tag.name);
            setTags(allTagsUpdated);
        }
    }, []);

    const notify = (message) => toast(message);

    const handleAddTag = () => {
        console.log(newTag.trim())
        if (newTag.trim() && !tags.includes(newTag.trim()) && !addedTags.includes(newTag.trim())) {
            setAddedTags([...addedTags, newTag.trim()]);
            setNewTag('');
        } else if (addedTags.includes(newTag.trim())) {
            notify(`Tag: ${newTag.trim()} already in to be added list!`);
        } else if(newTag.trim()){
            notify(`Tag: ${newTag.trim()} was already added!`);
        }else{
            notify(`Tag is empty. Please add valid tag!`);
        }
    };

    const handleRemoveTag = (tagToRemove, type) => {
        if (type === 'existing') {
            setTags(tags.filter((tag) => tag !== tagToRemove));
            setDeletedTags([...deletedTags, tagToRemove]);
        } else if (type === 'new') {
            setAddedTags(addedTags.filter((tag) => tag !== tagToRemove));
        } else if (type === 'delete') {
            setTags([...tags, tagToRemove]);
            setDeletedTags(deletedTags.filter((tag) => tag !== tagToRemove));
        }
    };

    const handleConfirm = () => {
        if (addedTags.length > 0) setShowConfirmationModal(true);
    };

    const confirmDelete = async () => {
        try {
            setIsLoading(true);
            await Promise.all(
                addedTags.map(async (tag) => {
                    await careerCompassApi.postApiCall(userJson, urlPaths.CREATE_TAG, {
                        name: tag,
                        userId: storedUser.userId,
                    });
                })
            );

            const updatedTags = await careerCompassApi.getApiCall(userJson, `${urlPaths.GET_ALL_TAGS}${storedUser.userId}`);
            localStorage.setItem('allTags', JSON.stringify(updatedTags.data));

            const allTagsUpdated = updatedTags.data.map((tag) => tag.name);
            setTags(allTagsUpdated);
            setAddedTags([]);
            setShowConfirmationModal(false);
            notify(`Tag has been added`);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const handleConfirmEdit = async (tag, editedTagName) => {
        try {
            setIsLoading(true);
            const tagId = existingTags.find((tagObj) => tagObj.name === tag)?.id;

            await careerCompassApi.putApiCall(userJson, urlPaths.UPDATE_TAG, {
                id: tagId,
                name: editedTagName,
                userId: storedUser.userId,
            });

            const [getAllTags, unarchivedJobs, archivedJobs] = await Promise.all([
                careerCompassApi.getApiCall(userJson, `${urlPaths.GET_ALL_TAGS}${storedUser.userId}`),
                careerCompassApi.getApiCall(userJson, `${urlPaths.GET_UNARCHIVED_JOB_APPLICATIONS}${storedUser.userId}`),
                careerCompassApi.getApiCall(userJson, `${urlPaths.GET_ARCHIVED_JOB_APPLICATIONS}${storedUser.userId}`),
            ]);

            localStorage.setItem('allTags', JSON.stringify(getAllTags.data));
            localStorage.setItem('unArchivedJobs', JSON.stringify(unarchivedJobs.data));
            localStorage.setItem('archivedJobs', JSON.stringify(archivedJobs.data));

            const allTagsUpdated = getAllTags.data.map((tag) => tag.name);
            setTags(allTagsUpdated);
            setEditingTag(null);
            setEditedTagName('');
            notify(`Tag: ${tag} has been changed to ${editedTagName}.`);
            setIsLoading(false);
        } catch (error) {
            console.error('Error updating tag:', error);
            setIsLoading(false);
        }
    };

    const handleEdit = (tag) => {
        setEditingTag(tag);
        setEditedTagName(tag);
    };

    return (
        <div className="add-tags-background-container">
            <div className="add-tags-container">
                {isLoading && <Loader/>}
                <ToastContainer/>
                {tags.length > 0? <h2 className="add-tags-title">Existing Tags</h2>:<h2> Add Tags </h2>}
                <div className="tag-list">
                    {tags.map((tag, index) => (
                        <span key={index} className={`added-tag tag-${index}`}>
              {tag}
                            <AiOutlineEdit onClick={() => handleEdit(tag)}/>
            </span>
                    ))}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a new tag"
                        className="tag-input"
                    />
                    <button className="add-tag-btn" onClick={handleAddTag}>
                        Add Tag
                    </button>
                </div>
                {addedTags.length > 0 && (
                    <div className="added-tags-container">
                        <h4>Tags to be Added:</h4>
                        <div className="added-tag-list">
                            {addedTags.map((tag, index) => (
                                <span key={index} className={`added-tag tag-${index}`}>
                  {tag}
                                    <button className="remove-tag-btn" onClick={() => handleRemoveTag(tag, 'new')}>
                    x
                  </button>
                </span>
                            ))}
                        </div>
                    </div>
                )}
                {deletedTags.length > 0 && (
                    <div className="added-tags-container">
                        <h4>Tags to be Deleted:</h4>
                        <div className="added-tag-list">
                            {deletedTags.map((tag, index) => (
                                <span key={index} className={`added-tag tag-${index}`}>
                  {tag}
                                    <button className="remove-tag-btn" onClick={() => handleRemoveTag(tag, 'delete')}>
                    x
                  </button>
                </span>
                            ))}
                        </div>
                    </div>
                )}
                <button className="confirm-btn" onClick={handleConfirm}>
                    Confirm
                </button>
                <ConfirmationModal
                    show={showConfirmationModal}
                    onHide={() => setShowConfirmationModal(false)}
                    onConfirm={confirmDelete}
                    bodyContent={
                        <>
                            Are you sure you want to add these tags?:&nbsp;
                            {addedTags.map((tag, index) => (
                                <span key={index}>
                  {index > 0 && ', '}
                                    {tag}
                </span>
                            ))}
                        </>
                    }
                />
                <EditTagModal
                    show={editingTag !== null}
                    onHide={() => setEditingTag(null)}
                    onConfirm={handleConfirmEdit}
                    tag={editingTag}
                    editedTagName={editedTagName}
                    setEditedTagName={setEditedTagName}
                />
            </div>
        </div>
    );
};

export default AddTags;
