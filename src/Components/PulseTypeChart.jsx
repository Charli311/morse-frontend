import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PulseTypeChart = ({ pulseData }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Handle cases where pulseData is undefined or not an array
  if (!Array.isArray(pulseData) || pulseData.length === 0) {
    return <p>No pulse data available.</p>;
  }

  // Set initial selection to the latest entry or first entry if available
  useEffect(() => {
    setSelectedEntry(pulseData[pulseData.length - 1]);
  }, [pulseData]);

  const handleChange = (event) => {
    const entryId = event.target.value;
    const entry = pulseData.find((entry) => entry.id === entryId);
    setSelectedEntry(entry);
  };

  if (!selectedEntry) {
    return <p>Select an entry to display pulse data.</p>;
  }

  // Destructure selected entry
  const {
    word = "N/A",
    timeStamp = "Unknown",
    longs = 0,
    shorts = 0,
  } = selectedEntry;

  // Data for the pie chart comparing shorts and longs
  const data = {
    labels: ["Shorts", "Longs"],
    datasets: [
      {
        label: "Count of Shorts vs Longs",
        data: [shorts, longs],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { mode: "index", intersect: false },
      legend: {
        display: true,
        position: "top",
        labels: {
          fontColor: "black", // Set font color of the legend to black
        },
      },
    },
  };

  return (
    <div style={{ paddingBottom: "50px", overflow: "hidden" }}>
      <h2 style={{ color: "black" }}>Shorts vs Longs Comparison</h2>

      {/* Dropdown to select an entry */}
      <label htmlFor="entry-selector" style={{ color: "black" }}>
        Select Entry:
      </label>
      <select
        id="entry-selector"
        onChange={handleChange}
        value={selectedEntry.id}
        style={{ marginBottom: "20px" }}
      >
        {pulseData.map((entry) => (
          <option key={entry.id} value={entry.id}>
            {`Entry ID: ${entry.id}`}
          </option>
        ))}
      </select>

      {/* Display the chart */}
      <div style={{ position: "relative", height: "60vh" }}>
        <h3 style={{ color: "black" }}>Shorts vs Longs for "{word}"</h3>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PulseTypeChart;
