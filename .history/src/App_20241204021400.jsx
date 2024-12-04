import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kingdoms from "./Countries";  // Use your 'Kingdoms' component
import KingdomCard from "./KingdomCard";  // Use your 'KingdomCard' component
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Render Kingdoms and keep the dropdown visible */}
        <Route path="/" element={<Kingdoms />}>
          {/* Child route for rendering KingdomCard when a specific kingdom is selected */}
          <Route path="countries/:cca2" element={<KingdomCard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;