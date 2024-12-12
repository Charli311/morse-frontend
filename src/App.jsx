import React from "react";
import MorseInfoPage from "./Pages/MorseInfoPage";
import { Route, Routes } from "react-router-dom";
import FirebaseInfoPage from "./Pages/FirebaseInfoPage";
import GraphsPage from "./Pages/GraphsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MorseInfoPage />} />;
      <Route path="/list" element={<FirebaseInfoPage />} />
      <Route path="/graphs" element={<GraphsPage />} />
    </Routes>
  );
};

export default App;
