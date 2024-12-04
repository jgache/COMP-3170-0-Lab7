import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { cca2 } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca2}`);
        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          setError("No country found for the given code.");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [cca2]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!country) {
    return <div>No country data available.</div>;
  }

  return (
    <div
      style={{
        textAlign: "center",
        margin: "30px auto",
        border: "2px solid #ccc",
        borderRadius: "12px",
        padding: "25px",
        maxWidth: "400px",
        backgroundColor: "#f9f9f9",
        fontFamily: "'Arial', sans-serif",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>
        {country.name.official}
      </h2>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        style={{
          width: "150px",
          height: "auto",
          margin: "15px 0",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      />
      <p style={{ margin: "10px 0", color: "#555", fontSize: "16px" }}>
        <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
      </p>
      <p style={{ margin: "10px 0", color: "#555", fontSize: "16px" }}>
        <strong>Located in:</strong> {country.subregion || "N/A"}
      </p>
    </div>
  );
};

export default Details;
