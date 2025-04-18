import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GuideNavbar from './GuideNavbar';
import baseUrl from '../apiConfig';
import 'bootstrap/dist/css/bootstrap.css';
import './ViewPlace.css'; 

const ViewPlace = () => {
    const navigate = useNavigate();
    const [place, setPlace] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchPlaces=async ()=>{
      setLoading(true); 
      try{
      await axios
          .get(`${baseUrl}`)
          .then((response)=>{
            setPlace(response.data);
            setLoading(false);
          })
        }catch(error)
        {
          setErrors('Failed to load places' );
        }
        finally{
          setLoading(false);

        }

    const fetchPlaces = () => {
        setLoading(true);
        axios
            .get(`${baseUrl}`)
            .then((response) => {
                setPlace(response.data);
                setLoading(false);
            })
            .catch(() => {
                setErrors('Failed to load places');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPlaces();
    }, []);

    const handleDelete = (placeId) => {
        axios
            .delete(`${baseUrl}/${placeId}`)
            .then(() => {
                setSuccessMessage('Place successfully deleted.');
                setPlace((prePlaces) => prePlaces.filter((place) => place.placeId !== placeId));
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(() => {
                setErrors('Failed to delete place.');
                setTimeout(() => setErrors(''), 3000);
            });
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

  return (
    <div>
      <GuideNavbar/>
        <h2 style={{textAlign:"center"}}>Places</h2>
        {successMessage && <p class="text-success"><h2>{successMessage}</h2></p>}
        {errors && <p class="text-danger"><h2>{errors}</h2></p>}
        {loading && <p>Loading...</p>}
        {!loading && !errors && <p><h2>{errors}</h2></p>}
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
          {place.length===0 ? (
            <p>No places available</p>
          ) : (
            <ul>
              {Array.isArray(place) && place.map((myPlace)=>(
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
                            <button onClick={()=>handleEdit(myPlace.PlaceId)}  class="btn btn-primary ">Edit</button>
                            <button onClick={()=> handleDelete(myPlace.PlaceId)} class="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      </tbody>
                  </div>
                </li>
              ))}
            </ul>
          )}
          </table>
          
    
    return (
        <div>
            <GuideNavbar />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Places</h2>
                {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
                {errors && <div className="alert alert-danger text-center">{errors}</div>}
                {loading && <div className="text-center">Loading...</div>}
                {!loading && !errors && place.length === 0 && <div className="text-center">No places available</div>}
                {!loading && !errors && place.length > 0 && (
                    <div className="table-responsive">
                        <table className="table table-light table-striped">
                            <thead>
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
                                {Array.isArray(place) && place.map((myPlace) => (
                                    <tr key={myPlace.PlaceId || myPlace.Name}>
                                        <td><img src={myPlace.PlaceImage} alt={myPlace.Name} className="img-fluid" /></td>
                                        <td>{myPlace.Name}</td>
                                        <td>{myPlace.Category}</td>
                                        <td>{myPlace.Location}</td>
                                        <td>{myPlace.BestTimeToVisit}</td>
                                        <td>
                                            <button onClick={() => handleEdit(myPlace.PlaceId)} className="btn btn-primary btn-sm mr-2">Edit</button>
                                            <button onClick={() => handleDelete(myPlace.PlaceId)} className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewPlace;
