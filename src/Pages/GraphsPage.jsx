import Style from "../CSS/GraphsPage.module.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import WordLengthChart from "../Components/WordLengthChart";
import PulseTimeChart from "../Components/PulseTimeChart";
import PulseTypeChart from "../Components/PulseTypeChart";

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
      <div>
        {morseData.length > 0 ? (
          <>
            <WordLengthChart morseData={morseData} />
            <PulseTimeChart pulseData={morseData} />
            <PulseTypeChart pulseData={morseData} />
          </>
        ) : (
          <p>Loading data ...</p>
        )}
      </div>
    </div>
  );
};
export default GraphsPage;
