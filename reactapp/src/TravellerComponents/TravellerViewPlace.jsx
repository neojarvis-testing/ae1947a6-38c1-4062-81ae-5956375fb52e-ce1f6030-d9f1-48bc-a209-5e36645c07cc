import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TravellerNavbar from "./TravellerNavbar";
import "./TravellerViewPlace.css";

const TravellerViewPlace = () => {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch("https://example.com/api/places")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setPlaces(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setErrorOccurred(true);
        setIsLoading(false);
      });
  }, []);

  const filteredPlaces = places.filter((place) =>
    place.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this place?")) {
      fetch(`https://example.com/api/places/${id}`, {
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
                  <button onClick={() => handleEdit(place.id)}>Edit</button>
                  <button onClick={() => handleDelete(place.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TravellerViewPlace;
