import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "../CSS/FirebaseInfoPage.module.scss";
import Header from "../Components/Header";

const FirestoreInfo = () => {
  const [morseData, setMorseData] = useState([]);

  const fetchFirestoreData = async () => {
    try {
      const response = await axios.get("/api/recover_firebase");
      setMorseData(response.data);
    } catch (error) {
      console.error("Error fetching Firestore data:", error);
    }
  };

  useEffect(() => {
    fetchFirestoreData();
  }, []);

  return (
    <div className={Style.firebase_total}>
      <h1>Stored Data from Firestore</h1>
      <ul>
        {morseData.length > 0 ? (
          morseData.map((entry) => (
            <li key={entry.id}>
              <p>
                <strong>Word:</strong> {entry.word}
              </p>
              <p>
                <strong>Word Length:</strong> {entry.word_length}
              </p>
              <p>
                <strong>Time Differences:</strong>{" "}
                {entry.time_between_data.join(", ")}
              </p>
              <p>
                <strong>Short Pulses:</strong> {entry.shorts}
              </p>
              <p>
                <strong>Long Pulses:</strong> {entry.longs}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(entry.timeStamp).toLocaleString()}
              </p>
            </li>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </ul>
    </div>
  );
};

export default FirestoreInfo;
