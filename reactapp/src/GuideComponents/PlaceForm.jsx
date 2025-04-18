import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import './PlaceForm.css';
 
 
const PlaceForm = ({ isEditing, initialData = {}, onSubmit, onBack }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [bestTimeToVisit, setBestTimeToVisit] = useState('');
    const [placeImage, setPlaceImage] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
 
    useEffect(() => {
        if (isEditing && initialData) {
            setName(initialData.name || '');
            setCategory(initialData.category || '');
            setBestTimeToVisit(initialData.bestTimeToVisit || '');
            setPlaceImage(initialData.placeImage || '');
            setLocation(initialData.location || '');
        }
    }, [isEditing, initialData]);
 
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, placeImage: 'Only image files are allowed' }));
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, placeImage: 'Image size should be less than 2MB' }));
                return;
            }
 
=======
import API_BASE_URL from '../apiConfig';
import GuideNavbar from './GuideNavbar';
import baseUrl from '../apiConfig';

const PlaceForm = ({ mode }) => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the place ID from the URL params

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        bestTimeToVisit: '',
        location: '',
        placeImage: null,
    });
    const [fileName, setFileName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');

    // Fetch place data when editing
    useEffect(() => {
        const fetchPlaceData = async () => {
            if (mode === 'edit' && id) {
                setLoading(true);
                try {
                    const response = await axios.get(`${baseUrl}/Place/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    setFormData(response.data);
                } catch (error) {
                    setFormError('Error fetching place data');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchPlaceData();
    }, [mode, id]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.bestTimeToVisit) newErrors.bestTimeToVisit = 'Best Time to Visit is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.placeImage) newErrors.placeImage = 'Place image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            const file = files[0];
            setFileName(file.name);

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

 
    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};
 
        if (!name) validationErrors.name = 'Name is required';
        if (!category) validationErrors.category = 'Category is required';
        if (!location) validationErrors.location = 'Location is required';
        if (!bestTimeToVisit) validationErrors.bestTimeToVisit = 'Best Time to Visit is required';
        if (!placeImage) validationErrors.placeImage = 'Place image is required';
 
        setErrors(validationErrors);
 
        if (Object.keys(validationErrors).length === 0) {
            const placeData = { name, category, bestTimeToVisit, placeImage, location };
            if (typeof onSubmit === 'function') {
                onSubmit(placeData);
                setShowSuccessModal(true);
            } else {
                console.error('onSubmit function is not provided or is not callable.');
            }
        }
    };
 
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        onBack();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            if (mode === 'edit') {
                await axios.put(`${baseUrl}/Place/${id}`, formData, { headers });
            } 
            else {
                
                await axios.post(`${baseUrl}/Place`, formData, { headers });
            }

            setLoading(false);
            setShowPopup(true);
        }
         catch (error) 
         {
            setLoading(false);
            console.error('Error saving place:', error);

            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        navigate('/viewplace');
    };
 
    return (

        <div>
            <GuideNavbar />
            <div className="container place-form-container">
            <button className="btn btn-secondary mb-3" onClick={onBack}>Back</button>
            <h2 className="text-center">{isEditing ? 'Edit Place' : 'Create New Place'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter place name"
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category <span className="text-danger">*</span></label>
                    <select
                        id="category"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="Beach">Beach</option>
                        <option value="Mountain">Mountain</option>
                        <option value="City">City</option>
                        <option value="Historical">Historical</option>
                    </select>
                    {errors.category && <div className="text-danger">{errors.category}</div>}

        <div className="container mt-5">
            <GuideNavbar username="DemoGuide" role="Guide" />
            <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
                Back
            </button>
            <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-4">{mode === 'edit' ? 'Edit Place' : 'Create New Place'}</h2>
                    {formError && <p className="text-danger text-center">{formError}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="category">Category <span className="text-danger">*</span></label>
                            <select
                                id="category"
                                name="category"
                                className="form-control"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select a category</option>
                                <option value="Beach">Beach</option>
                                <option value="Mountain">Mountain</option>
                                <option value="City">City</option>
                                <option value="Historical">Historical</option>
                            </select>
                            {errors.category && <small className="text-danger">{errors.category}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="bestTimeToVisit">Best Time to Visit <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="bestTimeToVisit"
                                name="bestTimeToVisit"
                                className="form-control"
                                value={formData.bestTimeToVisit}
                                onChange={handleChange}
                            />
                            {errors.bestTimeToVisit && <small className="text-danger">{errors.bestTimeToVisit}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="location">Location <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                className="form-control"
                                value={formData.location}
                                onChange={handleChange}
                            />
                            {errors.location && <small className="text-danger">{errors.location}</small>}
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="placeImage">Place Image <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <input
                                    type="file"
                                    id="placeImage"
                                    name="placeImage"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.placeImage && <small className="text-danger">{errors.placeImage}</small>}
                        </div>
                        {formData.placeImage && (
                            <div className="text-center mb-4">
                                <img
                                    src={formData.placeImage}
                                    alt="Place Preview"
                                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? (
                                <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                            ) : (
                                mode === 'edit' ? 'Update Place' : 'Add Place'
                            )}
                        </button>
                    </form>

                </div>
            </div>
            {showPopup && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-sm border-0">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title mx-auto">🎉 Success!</h5>
                            </div>
                            <div className="modal-body text-center">
                                <p className="mb-0">
                                    {mode === 'edit' ? 'Place updated successfully!' : 'Place added successfully!'}
                                </p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-success px-4" onClick={handlePopupClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                    />
                    {errors.location && <div className="text-danger">{errors.location}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="placeImage">Place Image <span className="text-danger">*</span></label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="placeImage"
                        onChange={handleImageChange}
                    />
                    {errors.placeImage && <div className="text-danger">{errors.placeImage}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    {isEditing ? 'Update Place' : 'Add Place'}
                </button>
            </form>
 
            <Modal show={showSuccessModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{isEditing ? 'Place updated successfully!' : 'Place added successfully!'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            )}

        </div>
        </div>
    );
};

export default PlaceForm;
 
 