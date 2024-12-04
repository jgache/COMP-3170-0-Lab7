import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

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
        const kingdomCountries = data.filter((country) =>
          country.name.common.toLowerCase().includes("kingdom")
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
