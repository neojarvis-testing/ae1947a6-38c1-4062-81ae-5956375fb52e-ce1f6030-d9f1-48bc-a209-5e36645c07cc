import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import GuideNavbar from './GuideNavbar';
import baseUrl from '../apiConfig';
import 'bootstrap/dist/css/bootstrap.css';

const ViewPlace = () => {

    const navigate = useNavigate();
    const [places, setPlace] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');


    // Fetch cakes from API
    useEffect(() => {
        const fetchplaces = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                const response = await axios.get(`${baseUrl}/viewplaces`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Authorization header
                    },
                });
                setPlace(response.data);
            } catch (err) {
                console.error('Error fetching places:', err);
                setErrors('Failed to fetch places. Please try again later.');
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };
        fetchplaces();
    }, []);

    //   useEffect(() => {
    //     const fetchCakes = async () => {
    //         try {
    //             const token = localStorage.getItem('token'); // Retrieve token from localStorage
    //             const response = await axios.get(`${API_BASE_URL}/cakes`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`, // Add Authorization header
    //                 },
    //             });
    //             setCakes(response.data);
    //         } catch (err) {
    //             console.error('Error fetching cakes:', err);
    //             setError('Failed to fetch cakes. Please try again later.');
    //         } finally {
    //             setLoading(false); // Stop loading spinner
    //         }
    //     };
    //     fetchCakes();
    // }, []);
    // useEffect(()=>{
    //   fetchPlaces();
    // },[]);



    //handle edit button

    const handleEdit = (place) => {
        console.log('Selected Place:', place);
        localStorage.setItem('selectedPlace', JSON.stringify(place));
        navigate('/PlaceForm', { state: { place } });
    };

    //     const handleEdit = (cake) => {
    //       console.log('Selected Cake:', cake); // Debugging: Check the selected cake
    //   localStorage.setItem('selectedCake', JSON.stringify(cake));
    //   navigate('/edit-cake', { state: { cake } }); // Pass the selected cake details via state
    // };



    // handle delete button
    const handleDelete = async (placeId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this place?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                console.log('Token:', token);
                await axios.delete(`${baseUrl}/places/${placeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Authorization header
                    },
                });
                setPlace(places.filter((place) => place.placeId !== placeId)); // Remove deleted cake from state
                alert('Place deleted successfully!');
            } catch (err) {
                console.error('Error deleting Place:', err);
                alert('Failed to delete the Place. Please try again later.');
            }
        }
    }

        // Handle Delete Button
        //   const handleDelete = async (cakeId) => {
        //     const confirmDelete = window.confirm('Are you sure you want to delete this cake?');
        //     if (confirmDelete) {
        //         try {
        //             const token = localStorage.getItem('token'); // Retrieve token from localStorage
        //             console.log('Token:', token);
        //             await axios.delete(`${API_BASE_URL}/cakes/${cakeId}`, {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`, // Add Authorization header
        //                 },
        //             });
        //             setCakes(cakes.filter((cake) => cake.cakeId !== cakeId)); // Remove deleted cake from state
        //             alert('Cake deleted successfully!');
        //         } catch (err) {
        //             console.error('Error deleting cake:', err);
        //             alert('Failed to delete the cake. Please try again later.');
        //         }
        //     }
        // };

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


                {/* Always Render Table*/}
                <table className="table table-bordered table-striped text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th >Image</th>
                            <th >Name</th>
                            <th >Category</th>
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
                        {places.map((place) => (
                            <tr key={place.placeId}>
                                <td>
                                    <img
                                        src={place.PlaceImage || 'https://via.placeholder.com/100'}
                                        alt={cake.name}
                                        style={{ height: '50px', objectFit: 'cover' }}
                                    />
                                </td>
                                <td>{cake.name}</td>
                                <td>{cake.category}</td>
                                <td>{cake.quantity}</td>
                                <td>Rs. {cake.price.toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => handleEdit(cake)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(cake.cakeId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>



                <div>
                    <table class="table table-light table-striped" >
                        <thead>
                            <tr>
                                <th >Image</th>
                                <th >Name</th>
                                <th >Category</th>
                                <th>Location</th>
                                <th>Best time to visit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {place.length === 0 ? (
                            <p>No places available</p>
                        ) : (
                            <ul>
                                {Array.isArray(place) && place.map((myPlace) => (
                                    <li key={myPlace.PlaceId || myPlace.Name}>
                                        <div>

                                            <tbody>
                                                <tr>
                                                    <td ><p>{myPlace.PlaceImage}</p></td>
                                                    <td ><p>{myPlace.Name}</p></td>
                                                    <td ><p>{myPlace.Category}</p></td>
                                                    <td ><p>{myPlace.Location}</p></td>
                                                    <td > <p>{myPlace.BestTimeToVisit}</p></td>
                                                    <td>
                                                        <button onClick={() => handleEdit(myPlace.PlaceId)} class="btn btn-primary ">Edit</button>
                                                        <button onClick={() => handleDelete(myPlace.PlaceId)} class="btn btn-danger">Delete</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </table>


                </div>
            </div>
        )
}
export default ViewPlace;

