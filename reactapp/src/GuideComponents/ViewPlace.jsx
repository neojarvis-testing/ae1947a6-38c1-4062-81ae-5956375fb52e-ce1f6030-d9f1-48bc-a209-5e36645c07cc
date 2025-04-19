import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GuideNavbar from './GuideNavbar';
import baseUrl from '../apiConfig';
import 'bootstrap/dist/css/bootstrap.css';
 
const ViewPlace = () => {
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
 
    // Fetch places from API
 
    useEffect(() => {
        const fetchPlaces = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseUrl}/Place`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
 
                console.log(response);
 
                setPlaces(response.data);
            } catch (err) {
                console.error('Error fetching places:', err);
                setErrors('Failed to fetch places. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchPlaces();
    }, []);
  
    const handleEdit = (place) => {
        console.log('Selected Place:', place);
        navigate('/editPlace', { state: { place } });
    };
 
    // Handle delete button
    const handleDelete = async (placeId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this place?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token);
                await axios.delete(`${baseUrl}/Place/${placeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSuccessMessage("Place successfully deleted.");
                setPlaces((prevPlaces) => prevPlaces.filter((place) => place.placeId !== placeId));
                setTimeout(() => setSuccessMessage(""), 3000);
            } catch (err) {
                console.error('Error deleting place:', err);
                setErrors('Failed to delete place.');
                setTimeout(() => setErrors(""), 3000);
            }
        }
    };
 
    return (
        <div className="container mt-5">
            <GuideNavbar />
            <h2 className="text-center mb-4">Places</h2>
 
            {/* Display Error */}
            {errors && <p className="text-danger text-center">{errors}</p>}
 
            {/* Display Spinner */}
            {loading && (
                <div className="text-center">
                    <div className="spinner-border text-primary mb-2" role="status" aria-hidden="true"></div>
                    <div className="mt-2">Loading...</div>
                </div>
            )}
 
            {/* Always Render Table */}
            <table className="table table-bordered table-striped text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Best time to visit</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {places.length === 0 && !loading && !errors && (
                        <tr>
                            <td colSpan="6" className="text-center text-muted">
                                No Places found.
                            </td>
                        </tr>
                    )}
                    {places.map((myPlace) => (
                        <tr key={myPlace.placeId}>
                            <td>
                                <img
                                    src={myPlace.PlaceImage || 'https://via.placeholder.com/100'}
                                    alt={myPlace.Name}
                                    style={{ height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td><p>{myPlace.Name}</p></td>
                            <td><p>{myPlace.Category}</p></td>
                            <td><p>{myPlace.Location}</p></td>
                            <td><p>{myPlace.BestTimeToVisit}</p></td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEdit(myPlace)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(myPlace.placeId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
 
export default ViewPlace;
 