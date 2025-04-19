import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../apiConfig';
import 'bootstrap/dist/css/bootstrap.css';
import TravellerNavbar from './TravellerNavbar';

const ViewPlace = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter places based on search query
  const filteredPlaces = places.filter((place) =>
    place.Name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <TravellerNavbar />
      <h2 className="text-center mb-4">Available Places</h2>

      {/* Search Bar */}
      <div className="mb-4 text-right">
        <input
          type="text"
          placeholder="Search places..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
          style={{ maxWidth: '300px', display: 'inline-block' }}
        />
      </div>

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
          </tr>
        </thead>
        <tbody>
          {filteredPlaces.length === 0 && !loading && !errors && (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No Places found.
              </td>
            </tr>
          )}
          {filteredPlaces.map((myPlace) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPlace;
