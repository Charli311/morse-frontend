import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Style from "../CSS/MorseInfoPage.module.scss";

const MorseInfoPage = () => {
  const [buffer, setBuffer] = useState("");
  const [sentence, setSentence] = useState("");
  const [nextWord, setNextWord] = useState("");

  const fetchData = async () => {
    try {
      // Fetch data from the Flask backend (replace with your actual API route)
      const response = await axios.get("/api/recover_morse"); // Backend route
      setBuffer(response.data.word);
      setSentence(response.data.sentence);
      setNextWord(response.data.next_word);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);
  }, []);

  return (
    <div className={Style.home}>
      <h1 className={Style.home_title}>Morse Code Visualizer</h1>
      <div className={Style.content_container}>
        <h2>Word:</h2>
        <p>{buffer}</p>
      </div>
      <div className={Style.content_container}>
        <h2>Sentence:</h2>
        <p>{sentence}</p>
      </div>
      <div className={Style.content_container}>
        <h2>Next Predicted Word:</h2>
        <p>{nextWord}</p>
      </div>
    </div>
  );
};

export default MorseInfoPage;
