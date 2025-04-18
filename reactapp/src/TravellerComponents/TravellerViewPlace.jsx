import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TravellerNavbar from "./TravellerNavbar";
import "./TravellerViewPlace.css"; // Import the CSS file
import baseUrl from '../apiConfig'
import axios from 'axios';

const TravellerViewPlace = () => {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const navigate = useNavigate();

  const fetchTravel=async ()=>{
    setIsLoading(true); 
    try{
    await axios
        .get(`${baseUrl}`)
        .then((response)=>{
          setPlaces(response.data);
          setIsLoading(false);
        })
      }catch(error)
      {
        setErrorOccurred('Failed to load places' );
    
      }
      finally{
        setIsLoading(false);

      }
  };
  useEffect(()=>{
    fetchTravel();
  },[]);


  const filteredPlaces = places.filter((place) =>
    place.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this place?")) {
      fetch(`${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setPlaces((prevPlaces) =>
              prevPlaces.filter((place) => place.id !== id)
            );
            console.log("Place deleted successfully.");
          } else {
            console.error("Failed to delete the place.");
          }
        })
        .catch((error) => {
          console.error("Error deleting place:", error);
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <TravellerNavbar/>
      <div className="container mt-4">
        <h1>Available Places</h1>
        <input
          type="text"
          placeholder="Search places..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>Loading...</td>
              </tr>
            ) : errorOccurred || filteredPlaces.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>Oops! No places found....</td>
              </tr>
            ) : (
              filteredPlaces.map((place) => (
                <tr key={place.id}>
                  <td>
                    <img
                      src={place.imageUrl || "https://via.placeholder.com/50"}
                      alt={place.name}
                      style={{ width: "50px", height: "40px" }}
                    />
                  </td>
                  <td>{place.Name}</td>
                  <td>{place.Category}</td>
                  <td>{place.Location}</td>
                  <td>{place.Price}</td>
                  <td>
                    <button onClick={() => handleEdit(place.id)} className="edit">Edit</button>
                    <button onClick={() => handleDelete(place.id)} className="delete">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TravellerViewPlace;
