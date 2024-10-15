import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Table from './Table';
import {AiOutlineEye, AiFillStar, AiOutlineStar, AiOutlineSearch} from 'react-icons/ai';
import './TableContainer.css';
import ConfirmationModal from "./ConfirmationModal";
import {careerCompassApi} from "../Utils/CareerCompassApi";
import {urlPaths} from "../../Constants";
import {BiSolidArchiveOut} from "react-icons/bi";
import Select from "react-select";
import Loader from "../Utils/Loader";
import moment from "moment/moment";

const ArchivedTableContainer = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const existingTags = JSON.parse(localStorage.getItem('allTags'))
    const allTags = existingTags.map(tag => tag.name);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userDetails'))
        setUser(storedUser)
        const archivedJobs = JSON.parse(localStorage.getItem('archivedJobs'));
        const fetchData = async () => {
            try {
                setData(archivedJobs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const columns = [
        {
            Header: 'Starred',
            accessor: 'starred',
            Cell: ({row}) => (
                <div>
                    {row.original.starred ? <AiFillStar aria-disabled={true} className="action-icon action-star"/>
                        :
                        <AiOutlineStar aria-disabled={true} className="action-icon"/>}
                </div>
            )
        },
        {
            Header: 'Company Name',
            accessor: 'companyUrl',
            Cell: ({row}) => (
                <a href={row.original.companyUrl} target="_blank" rel="noopener noreferrer">
                    {row.original.company}
                </a>
            )
        },
        {Header: 'Role', accessor: 'position'},
        {
            Header: 'Applied On',
            accessor: 'applicationDate',
            Cell: ({value}) => moment(value).format('MM-DD-YYYY'),
        },
        {Header: 'Status', accessor: 'status'},
        {
            Header: 'Tags',
            accessor: 'jobTags',
            Cell: ({value}) => {
                const cellRef = React.useRef(null);
                const [isOverflowing, setIsOverflowing] = React.useState(false);

                React.useEffect(() => {
                    const checkOverflow = () => {
                        if (cellRef.current) {
                            const cell = cellRef.current;
                            const isOverflowing = cell.scrollWidth > cell.clientWidth;
                            setIsOverflowing(isOverflowing);

                            if (isOverflowing) {
                                const tags = [...cell.children].filter(child => child.classList.contains('added-tag'));
                                let visibleWidth = 0;
                                for (let i = 0; i < tags.length; i++) {
                                    const tagWidth = tags[i].offsetWidth + 4;
                                    if (visibleWidth + tagWidth > cell.clientWidth - 30) {
                                        tags[i].style.opacity = '0.5';
                                        break;
                                    }
                                    visibleWidth += tagWidth;
                                }
                            }
                        }
                    };

                    checkOverflow();
                    window.addEventListener('resize', checkOverflow);
                    return () => window.removeEventListener('resize', checkOverflow);
                }, [value]);

                if (!value || value.length === 0) {
                    return <div></div>;
                }

                return (
                    <div ref={cellRef} className={`tags-cell ${isOverflowing ? 'overflowing' : ''}`}>
                        {value.map((tag, index) => (
                            <span key={index} className={`added-tag tag-${index % 4}`}>
                        {tag.name}
                    </span>
                        ))}
                        <span className="ellipsis">...</span>
                    </div>
                );
            },
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({row}) => (
                <>
                    <AiOutlineEye onClick={() => handleView(row.original)} className="action-icon"/>
                    <BiSolidArchiveOut onClick={() => handleDelete(row.original)} className="action-icon"/>
                </>
            )
        }
    ];

    const handleView = (rowData) => {
        navigate('/details', {state: {rowData, showEdit: false}});
    };


    const handleDelete = (rowData) => {
        setSelectedRowData(rowData);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            setIsLoading(true);
            const storedUser = JSON.parse(localStorage.getItem('userDetails'))
            const userJson = JSON.parse(localStorage.getItem('user'))
            const response = await careerCompassApi.deleteApiCall(userJson, urlPaths.UNARCHIVE_JOB_APPLICATION + storedUser.userId + `/${selectedRowData.id}`);
            const updatedData = data.filter(item => item.id !== selectedRowData.id);
            localStorage.setItem('archivedJobs', JSON.stringify(updatedData));
            const unArchivedJobs = JSON.parse(localStorage.getItem('unArchivedJobs'))
            unArchivedJobs.push(selectedRowData);
            localStorage.setItem('unArchivedJobs', JSON.stringify(unArchivedJobs));
            setData(updatedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setShowDeleteModal(false);
        setIsLoading(false);
    };


    const handleChange = (newTags) => {
        setTags(newTags);
    };

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    useEffect(() => {
        const filtered = tags.length > 0
            ? data.filter((item) => tags.some((tag) => item.jobTags.map(tagObj => tagObj.name).includes(tag)))
            : data;
        setFilteredData(filtered);
    }, [tags, data]);

    return (
        <div className="search-table-container">
            {isLoading && <Loader/>}
            <div className="search-container">
                <button className="search-button" onClick={toggleSearchBar}>
                    <AiOutlineSearch className="search-icon"/>
                    <span className="search-text">Search by Tags</span>
                </button>
                {showSearchBar && (
                    <div className="search-bar">
                        <Select
                            isMulti
                            options={allTags.map((tag) => ({value: tag, label: tag}))}
                            value={tags.map((tag) => ({value: tag, label: tag}))}
                            onChange={(selectedOptions) => handleChange(selectedOptions.map((option) => option.value))}
                            placeholder="Type a tag and press enter..."
                            className="react-select"
                        />
                    </div>
                )}
            </div>
            <div className="table-container">
                <Table data={filteredData} columns={columns} iconStyle={{fontSize: '24px', marginRight: '12px'}}/>
            </div>
            <ConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                rowData={selectedRowData}
                bodyContent={
                    <>
                        <p>Are you sure you want to UnArchive this job application?</p>
                        {selectedRowData && (
                            <div>
                                <p>
                                    <strong>Job URL: </strong>
                                    <a href={selectedRowData.companyUrl} target="_blank"
                                       rel="noopener noreferrer">
                                        {selectedRowData.company}
                                    </a>
                                </p>
                                <p><strong>Role: </strong> {selectedRowData.position}</p>
                                <p><strong>Status : </strong> {selectedRowData.status}</p>
                            </div>
                        )}
                    </>
                }
            />
        </div>
    );
};

export default ArchivedTableContainer;