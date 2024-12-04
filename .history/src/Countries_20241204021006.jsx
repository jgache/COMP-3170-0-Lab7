import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const KingdomCard = () => {
  const { cca2 } = useParams(); // Get the country code from the URL
  const [kingdom, setKingdom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch country data based on cca2 (country code)
  useEffect(() => {
    const fetchKingdom = async () => {
      try {
        // Log the cca2 value to check if it's correct
        console.log("Fetching country with cca2:", cca2);

        const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca2}`);
        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }
        const data = await response.json();

        // Log the API response to check the data
        console.log("Fetched data:", data);

        if (data && data.length > 0) {
          setKingdom(data[0]); // Get the first country in the response
        } else {
          setError("No country found for the given code.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchKingdom();
  }, [cca2]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!kingdom) {
    return <div>No country data available.</div>;
  }

  return (
    <div style={{
      textAlign: "center",
      marginTop: "20px",
      border: "1px solid gainsboro",
      borderRadius: "15px", // Added rounded corners
      padding: "20px", // Added padding for better spacing
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Add subtle shadow for better depth
    }}>
      {/* Country Name */}
      <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
        {kingdom.name.official}
      </h2>

      {/* Country Flag */}
      <img
        src={kingdom.flags.svg}
        alt={`Flag of ${kingdom.name.common}`}
        style={{ width: "200px", margin: "20px 0" }}
      />

      {/* Capital and Subregion */}
      <p>
        <strong>Capital:</strong> {kingdom.capital ? kingdom.capital[0] : "N/A"}
      </p>
      <p>
        <strong>Located in:</strong> {kingdom.subregion || "N/A"}
      </p>
    </div>
  );
};

export default KingdomCard;