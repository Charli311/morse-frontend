import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register necessary chart components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const PulseTimeChart = ({ pulseData }) => {
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
    time_between_data = [],
  } = selectedEntry;

  // Ensure time data is in numeric format
  const numericTimeBetweenData = Array.isArray(time_between_data)
    ? time_between_data.map(Number)
    : [];

  // Check if there are valid data points
  if (numericTimeBetweenData.length === 0) {
    return <p>No valid pulse data available for the selected entry.</p>;
  }

  const data = {
    labels: numericTimeBetweenData.map((_, index) => `Pulse ${index + 1}`),
    datasets: [
      {
        label: `Pulse Times for "${word}" (${timeStamp})`,
        data: numericTimeBetweenData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { mode: "index", intersect: false },
      legend: { display: true, position: "top" },
    },
    scales: {
      x: {
        title: { display: true, text: "Pulse Number", color: "black" },
        ticks: { color: "black" },
      },
      y: {
        title: {
          display: true,
          text: "Time Between Pulses (s)",
          color: "black",
        },
        ticks: { color: "black" },
      },
    },
  };

  return (
    <div style={{ paddingBottom: "50px", overflow: "hidden" }}>
      <h2 style={{ color: "black" }}>Pulse Time Differences</h2>

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
        <h3 style={{ color: "black" }}>Pulse Time Chart for "{word}"</h3>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PulseTimeChart;
