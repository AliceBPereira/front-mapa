import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/axios";

export default function Cafes() {
  const [cafes, setCafes] = useState([]);

  const getCafes  = async () => {
    try {
      const response = await api.get("/cafes");
      console.log("Response data:", response.data.cafes);
      setCafes(response.data.cafes); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getCafes ();
  }, []);

  return (
    <div className="App">
      <h2>Listagem de cafés</h2>
      <ul>
        {Array.isArray(cafes) && cafes.length > 0 ? (
          cafes.map((cafe) => (
            <li key={cafe.id}>
              <Link to={`${cafe.id}/cafes`}>{cafe.talhao}</Link>
              <br />
              {cafe.cultivar}
              <br />
            </li>
          ))
        ) : (
          <p>No cafes to display.</p>
        )}
      </ul>
    </div>
  );
  
}
