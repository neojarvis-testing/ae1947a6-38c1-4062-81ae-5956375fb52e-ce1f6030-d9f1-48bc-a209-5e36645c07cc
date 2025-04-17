<<<<<<< HEAD
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlaceForm.css';

const PlaceForm = ({ onSubmit, initialData = {} }) => {
    const [name, setName] = useState(initialData.name || '');
    const [category, setCategory] = useState(initialData.category || '');
    const [bestTimeToVisit, setBestTimeToVisit] = useState(initialData.bestTimeToVisit || '');
    const [placeImage, setPlaceImage] = useState(initialData.placeImage || '');
    const [location, setLocation] = useState(initialData.location || '');
    const [errors, setErrors] = useState({});
=======
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom' 
import GuideNavbar from './GuideNavbar';
import baseUrl from '../apiConfig';
import 'bootstrap/dist/css/bootstrap.css';
import './ViewPlace.css';
const ViewPlace=() => {
>>>>>>> 79e14d0223453575042390a3871ece716b918a53

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

<<<<<<< HEAD
        if (!name) validationErrors.name = 'Name is required';
        if (!category) validationErrors.category = 'Category is required';
        if (!location) validationErrors.location = 'Location is required';
        if (!bestTimeToVisit) validationErrors.bestTimeToVisit = 'Best Time to visit is required';
        if (!placeImage) validationErrors.placeImage = 'Place image is required';
=======
    const fetchPlaces=()=>{
      setLoading(true); 
      axios
          .get(`${baseUrl}`)
          .then((response)=>{
            setPlace(response.data);
            setLoading(false);
          })
          .catch(()=>{
            setErrors('Failed to load places' );
            setLoading(false);
          });
    };
    useEffect(()=>{
      fetchPlaces();
    },[]);

    const handleDelete=(placeId)=>{
      axios                                 
          .delete(`${baseUrl}/${placeId}`)
          .then(()=>{
            setSuccessMessage("Place successfully deleted.");
            setPlace((prePlaces) => prePlaces.filter((place)=>place.placeId !== placeId));
            setTimeout(()=> setSuccessMessage(""),3000);
          })
      .catch(()=>{
        setErrors('Failed to delete place.');
        setTimeout(()=> setErrors(""),3000);
      });
    };
>>>>>>> 79e14d0223453575042390a3871ece716b918a53

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const placeData = { name, category, bestTimeToVisit, placeImage, location };
            onSubmit(placeData);
        }
    };

<<<<<<< HEAD
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
        </div>
    );
};

export default PlaceForm;
=======
  return (
    <div class="container mt-4">
    <GuideNavbar/>
      <br/>
      <br/>
        <h2 style={{textAlign:"center"}}>Places</h2>
      <br/>
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
            
            <tbody>
              {place.length ===0 ? (
                  <tr>
                      <td colSpan="6" >Oops! No places available</td>
                  </tr>
                    
                    ): (

                        place.map((myPlace)=>(
                        <tr key={myPlace.PlaceId || myPlace.Name}>
                            <td ><p>{myPlace.PlaceImage}</p></td>
                            <td ><p>{myPlace.Name}</p></td>
                            <td ><p>{myPlace.Category}</p></td>
                            <td ><p>{myPlace.Location}</p></td>
                            <td ><p>{myPlace.BestTimeToVisit}</p></td>
                            <td>
                              <button onClick={()=>handleEdit(myPlace.PlaceId)}  class="btn btn-primary ">Edit</button>
                              <button onClick={()=> handleDelete(myPlace.PlaceId)} class="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                        ))
                        )}

                      </tbody>
                    </table>
                  </div>  
  )
};
    
export default ViewPlace
>>>>>>> 79e14d0223453575042390a3871ece716b918a53
