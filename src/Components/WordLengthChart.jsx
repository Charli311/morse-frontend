import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const WordLengthChart = ({ morseData }) => {
  const data = {
    labels: morseData.map((entry) => entry.word || "Unnamed Word"), // Labels for words
    datasets: [
      {
        label: "Word Lengths",
        data: morseData.map((entry) => entry.word_length), // Word lengths
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "400px" }}>
      <h2>Word Length Distribution</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WordLengthChart;
