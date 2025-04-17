import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom' 
import GuideNavbar from './GuideNavbar';
import baseUrl from '../apiConfig';
import 'bootstrap/dist/css/bootstrap.css';
import './ViewPlace.css';
const ViewPlace=() => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

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

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const placeData = { name, category, bestTimeToVisit, placeImage, location };
            onSubmit(placeData);
        }
    };

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
