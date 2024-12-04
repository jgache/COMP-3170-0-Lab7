import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const knownKingdoms = [
  "Norway", "Tonga", "Lesotho", "Sweden", "Eswatini", "Morocco",
  "Bhutan", "Jordan", "Netherlands", "Saudi Arabia", "Denmark",
  "Bahrain", "Belgium", "Spain", "Cambodia", "United Kingdom", "Thailand"
];

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries data");
        }
        const data = await response.json();

        // Filter countries based on known kingdoms
        const kingdomCountries = data.filter((country) =>
          knownKingdoms.includes(country.name.common)
        );

        const sortedKingdoms = kingdomCountries.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(sortedKingdoms);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    if (selectedCountryCode) {
      navigate(`/countries/${selectedCountryCode}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>World Kingdoms</h1>
      <select className="country-dropdown" onChange={handleCountryChange}>
        <option value="">Select a Kingdom</option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>

      <Outlet />
    </div>
  );
};

export default Countries;
