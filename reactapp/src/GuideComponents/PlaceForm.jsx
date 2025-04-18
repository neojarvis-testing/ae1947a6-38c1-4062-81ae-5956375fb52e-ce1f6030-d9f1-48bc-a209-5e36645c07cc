import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlaceForm.css';
import { Modal, Button } from 'react-bootstrap';
import GuideNavbar from './GuideNavbar';

const PlaceForm = ({ onSubmit, initialData = {}, onBack }) => {
    const [name, setName] = useState(initialData.name || '');
    const [category, setCategory] = useState(initialData.category || '');
    const [bestTimeToVisit, setBestTimeToVisit] = useState(initialData.bestTimeToVisit || '');
    const [placeImage, setPlaceImage] = useState(initialData.placeImage || '');
    const [location, setLocation] = useState(initialData.location || '');
    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!name) validationErrors.name = 'Name is required';
        if (!category) validationErrors.category = 'Category is required';
        if (!location) validationErrors.location = 'Location is required';
        if (!bestTimeToVisit) validationErrors.bestTimeToVisit = 'Best Time to visit is required';
        if (!placeImage) validationErrors.placeImage = 'Place image is required';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const placeData = { name, category, bestTimeToVisit, placeImage: URL.createObjectURL(placeImage), location };
            onSubmit(placeData);
            setShowSuccessModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        onBack();
    };

    return (
        <div className="container place-form-container">

            <h2 className="text-center">{initialData.name ? 'Edit Place' : 'Create New Place'}</h2>
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
                </div>
                <div className="form-group">
                    <label htmlFor="bestTimeToVisit">Best Time to Visit <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="bestTimeToVisit"
                        value={bestTimeToVisit}
                        onChange={(e) => setBestTimeToVisit(e.target.value)}
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
                        onChange={(e) => setPlaceImage(e.target.files[0])}
                    />
                    {errors.placeImage && <div className="text-danger">{errors.placeImage}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    {initialData.name ? 'Update Place' : 'Add Place'}
                </button>
            </form>

            <Modal show={showSuccessModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Place updated successfully!</Modal.Body>
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
