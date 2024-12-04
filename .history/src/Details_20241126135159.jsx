"use client"

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Countries from "./Countries";
import Details from "./Details";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState({ continent: "", subregion: "" });
  const [sortOption, setSortOption] = useState(null); // No sorting by default
  const [top10, setTop10] = useState(false);
  const navigate = useNavigate();

  // Fetch countries data
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/name/kingdom")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error("Error fetching countries data:", error));
  }, []);

  useEffect(() => {
    let result = [...countries];

    // Apply continent filter
    if (filter.continent) {
      result = result.filter((country) =>
        country.continents?.includes(filter.continent)
      );
    }

    // Apply subregion filter
    if (filter.subregion) {
      result = result.filter(
        (country) => country.subregion === filter.subregion
      );
    }

    // Apply sorting options
    if (sortOption === "alphabetical") {
      result.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortOption === "population" && top10) {
      result = result.sort((a, b) => b.population - a.population).slice(0, 10);
    } else if (sortOption === "area" && top10) {
      result = result.sort((a, b) => b.area - a.area).slice(0, 10);
    }

    setFilteredCountries(result);
  }, [countries, filter, sortOption, top10]);

  const handleFilterChange = (type, value) => {
    setFilter((prev) => ({
      continent: type === "continent" ? value : prev.continent,
      subregion: type === "subregion" ? value : prev.subregion,
    }));
  };

  const handleSortToggle = (type) => {
    if (sortOption === type) {
      setSortOption(null);
      setTop10(false);
      return;
    }

    if (type === "alphabetical") {
      setSortOption("alphabetical");
      setTop10(false);
    } else if (type === "population") {
      setSortOption("population");
      setTop10(true);
    } else if (type === "area") {
      setSortOption("area");
      setTop10(true);
    }
  };

  return (
    <Router>
      <div>
        <h2>Countries of the World</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
          {/* Continent Filter */}
          <label>
            <strong>Continent:</strong>
            <select
              onChange={(e) => handleFilterChange("continent", e.target.value)}
              style={{ marginLeft: "5px" }}
            >
              <option value="">All</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
              <option value="Americas">Americas</option>
            </select>
          </label>

          {/* Subregion Filter */}
          <label>
            <strong>Subregion:</strong>
            <select
              onChange={(e) => handleFilterChange("subregion", e.target.value)}
              style={{ marginLeft: "5px" }}
            >
              <option value="">All</option>
              <option value="Northern Europe">Northern Europe</option>
              <option value="Eastern Africa">Eastern Africa</option>
            </select>
          </label>

          {/* Sorting Options */}
          <label>
            <strong>Sort By:</strong>
            <div style={{ display: "inline-block", marginLeft: "5px" }}>
              <label style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  checked={sortOption === "population"}
                  onChange={() => handleSortToggle("population")}
                />
                Population
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={sortOption === "area"}
                  onChange={() => handleSortToggle("area")}
                />
                Area
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={sortOption === "alphabetical"}
                  onChange={() => handleSortToggle("alphabetical")}
                />
                Alphabetical
              </label>
            </div>
          </label>
        </div>

    
