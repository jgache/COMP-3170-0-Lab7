import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Countries from "./Countries";
import Details from "./Details";

const App = () => {
  return (
    <BrowserRouter basename="your_repo_name"> 
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/countries" element={<Countries />}>
          <Route path=":cca2" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
