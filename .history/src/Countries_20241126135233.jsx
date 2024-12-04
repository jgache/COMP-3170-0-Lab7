import React from "react";
import { Link } from "react-router-dom";

const Countries = ({ countries, navigate }) => {
  const handleCountrySelect = (country) => {
    // Navigate to the country details page and pass country data as state
    navigate(`/countries/${country.cca2}`, { state: { data: country } });
  };

  return (
    <div>
      <h3>Countries</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {countries.map((country) => (
          <div key={country.cca2} style={{ width: "200px", border: "1px solid #ddd", padding: "10px", margin: "5px" }}>
            <h4>{country.name.common}</h4>
            <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
            <p>Population: {country.population}</p>
            <p>Area: {country.area} km²</p>
            <Link to={`/countries/${country.cca2}`} state={{ data: country }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
