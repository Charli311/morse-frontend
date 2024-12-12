import React from "react";
import MorseInfoPage from "./Pages/MorseInfoPage";
import { Route, Routes } from "react-router-dom";
import FirebaseInfoPage from "./Pages/FirebaseInfoPage";
import GraphsPage from "./Pages/GraphsPage";
import Footer from "./Components/Footer";
import "./CSS/App.scss";
import Header from "./Components/Header";

const App = () => {
  return (
    <div className="app_container">
      <Header />
      <main className="main_content">
        <Routes>
          <Route path="/" element={<MorseInfoPage />} />;
          <Route path="/list" element={<FirebaseInfoPage />} />
          <Route path="/graphs" element={<GraphsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
