import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/name/kingdom")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCountrySelect = (cca2, countryData) => {
    navigate(`countries/${cca2}`, { state: { data: countryData } });
  };

  return (
    <div>
      <h1>Select a Kingdom</h1>
      <select onChange={(e) => handleCountrySelect(e.target.value, countries.find(c => c.cca2 === e.target.value))}>
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Countries;
