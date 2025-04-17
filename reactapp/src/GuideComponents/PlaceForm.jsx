import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlaceForm.css'; // Custom CSS for additional styling

const PlaceForm = ({ onSubmit, initialData = {} }) => {
    const [name, setName] = useState(initialData.name || '');
    const [category, setCategory] = useState(initialData.category || '');
    const [bestTimeToVisit, setBestTimeToVisit] = useState(initialData.bestTimeToVisit || '');
    const [placeImage, setPlaceImage] = useState(initialData.placeImage || '');
    const [location, setLocation] = useState(initialData.location || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const placeData = { name, category, bestTimeToVisit, placeImage, location };
        onSubmit(placeData);
    };

    return (
        <div className="container place-form-container">
            <h2>{initialData.name ? 'Edit Place' : 'Add Place'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter place name"
                        required
                    />

                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category"
                        required
                    />

                    <label htmlFor="bestTimeToVisit">Best Time to Visit</label>
                    <input
                        type="text"
                        className="form-control"
                        id="bestTimeToVisit"
                        value={bestTimeToVisit}
                        onChange={(e) => setBestTimeToVisit(e.target.value)}
                        placeholder="Enter best time to visit"
                        required
                    />

                    <label htmlFor="placeImage">Place Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="placeImage"
                        value={placeImage}
                        onChange={(e) => setPlaceImage(e.target.value)}
                        placeholder="Enter image URL"
                        required
                    />

                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    {initialData.name ? 'Update Place' : 'Add Place'}
                </button>
            </form>
        </div>
    );
};

export default PlaceForm;
