import Style from "../CSS/GraphsPage.module.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import WordLengthChart from "../Components/WordLengthChart";

const GraphsPage = () => {
  const [morseData, setMorseData] = useState([]);
  const fetchFirestoreData = async () => {
    try {
      const response = await axios.get("/api/recover_firebase");
      setMorseData(response.data);
    } catch (error) {
      console.error("Error fetching Firestore data: ", error);
    }
  };
  useEffect(() => {
    fetchFirestoreData();
  }, []);

  return (
    <div>
      <Header />
      <div>
        {morseData.length > 0 ? (
          <>
            <WordLengthChart morseData={morseData} />
          </>
        ) : (
          <p>Loading data ...</p>
        )}
      </div>
    </div>
  );
};
export default GraphsPage;
