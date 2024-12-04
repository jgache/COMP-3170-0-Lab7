import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Countries = () => {
  const [kingdoms, setKingdoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKingdoms = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries data");
        }
        const data = await response.json();
        const filteredKingdoms = data.filter((country) => 
          country.kingdoms // Check if the country has a 'kingdoms' property
        );

        const sortedKingdoms = filteredKingdoms.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );

        setKingdoms(sortedKingdoms);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchKingdoms();
  }, []);

  const handleKingdomChange = (e) => {
    const selectedKingdomCode = e.target.value;
    if (selectedKingdomCode) {
      navigate(`/countries/${selectedKingdomCode}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>World Kingdoms</h1>
      <select className="kingdom-dropdown" onChange={handleKingdomChange}>
        <option value="">Select a Kingdom</option>
        {kingdoms.map((kingdom) => (
          <option key={kingdom.cca2} value={kingdom.cca2}>
            {kingdom.name.common}
          </option>
        ))}
      </select>

      <Outlet />
    </div>
  );
};

export default Countries;
