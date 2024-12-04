import React from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
  const { state } = useLocation();
  const country = state ? state.data : null;

  if (!country) {
    return <div>No country data available.</div>;
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ")}</p>
    </div>
  );
};

export default Details;
