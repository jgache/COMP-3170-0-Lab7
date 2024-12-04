import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Countries from "./Countries";
import Details from "./Details";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/0/06/Ryan_Gosling_-_Cannes_Film_Festival_-_02.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          color: "white",
        }}
      >
        <Routes>
          <Route path="/" element={<Countries />}>
            <Route path="countries/:cca2" element={<Details />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
