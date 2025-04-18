import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlaceForm.css';
import GuideNavbar from './GuideNavbar';

const PlaceForm = ({ onSubmit, initialData = {}, onBack }) => {
    const [name, setName] = useState(initialData.name || '');
    const [category, setCategory] = useState(initialData.category || '');
    const [bestTimeToVisit, setBestTimeToVisit] = useState(initialData.bestTimeToVisit || '');
    const [placeImage, setPlaceImage] = useState(initialData.placeImage || '');
    const [location, setLocation] = useState(initialData.location || '');
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
            const placeData = { name, category, bestTimeToVisit, placeImage, location };
            onSubmit(placeData);
            setShowPopup(true);
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
            <h2 className="text-center">{initialData.name ? 'Edit Place' : 'Create New Place'}</h2>
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
                        name="placeImage"
                        onChange={handleChange}
                    />
                    {errors.placeImage && <div className="text-danger">{errors.placeImage}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    {initialData.name ? 'Update Place' : 'Add Place'}
                </button>
            </form>

            {/* Success Modal */}
            {showPopup && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-sm border-0">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title mx-auto">🎉 Success!</h5>
                            </div>
                            <div className="modal-body text-center">
                                <p className="mb-0">
                                    {isEditing ? 'Place updated successfully!' : 'Place added successfully!'}
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
            )}
        </div>
    );
};

export default PlaceForm;
