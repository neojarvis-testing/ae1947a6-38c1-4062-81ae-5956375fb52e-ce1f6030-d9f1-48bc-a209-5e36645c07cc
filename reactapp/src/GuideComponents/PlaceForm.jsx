import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import GuideNavbar from './GuideNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlaceForm.css';
import GuideNavbar from './GuideNavbar'


const PlaceForm = ({ isEditing, initialData = {}, onSubmit, onBack }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [bestTimeToVisit, setBestTimeToVisit] = useState('');
    const [placeImage, setPlaceImage] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(!!initialData.name);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPlaceImage(reader.result); // Store the base64-encoded image
            };
            reader.readAsDataURL(file);
        } else {
            if (name === 'name') setName(value);
            if (name === 'category') setCategory(value);
            if (name === 'bestTimeToVisit') setBestTimeToVisit(value);
            if (name === 'location') setLocation(value);
        }
    };

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

            const reader = new FileReader();
            reader.onloadend = () => {
                setPlaceImage(reader.result);
                setErrors(prev => ({ ...prev, placeImage: '' }));
            };
            reader.readAsDataURL(file);
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

    const handlePopupClose = () => {
        setShowPopup(false);
        onBack();
    };

    return (
        <div className="container place-form-container">
            <GuideNavbar />
            <button className="btn btn-secondary mb-3" onClick={onBack}>Back</button>
            <h2 className="text-center">{isEditing ? 'Edit Place' : 'Create New Place'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category <span className="text-danger">*</span></label>
                    <select
                        id="category"
                        name="category"
                        className="form-control"
                        value={category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Beach">Beach</option>
                        <option value="Mountain">Mountain</option>
                        <option value="City">City</option>
                        <option value="Historical">Historical</option>
                    </select>
                    {errors.category && <div className="text-danger">{errors.category}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="bestTimeToVisit">Best Time to Visit <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="bestTimeToVisit"
                        name="bestTimeToVisit"
                        value={bestTimeToVisit}
                        onChange={handleChange}
                        placeholder="Enter best time to visit"
                    />
                    {errors.bestTimeToVisit && <div className="text-danger">{errors.bestTimeToVisit}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={location}
                        onChange={handleChange}
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
        </div>
    );
};

export default PlaceForm;
