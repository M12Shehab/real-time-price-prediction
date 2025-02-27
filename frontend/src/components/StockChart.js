import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "../styles.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = ({ ticker }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            { label: "Actual Close Price", data: [], borderColor: "gold", borderWidth: 2, fill: false },
            { label: "Linear Regression Prediction", data: [], borderColor: "red", borderWidth: 2, fill: false },
            { label: "Random Forest Prediction", data: [], borderColor: "blue", borderWidth: 2, fill: false },
            { label: "XGBoost Prediction", data: [], borderColor: "green", borderWidth: 2, fill: false },
        ],
    });
    const [error, setError] = useState(null);
    const API_URL = process.env.REACT_APP_BACKEND_URL || "http://realtime-backend.eastus.azurecontainer.io:8000";

    useEffect(() => {
        let isMounted = true; // Prevent state update on unmounted component
        const fetchData = async () => {
            try {
                console.log(`Fetching data for ${ticker}...`);
                const response = await axios.get(`${API_URL}/predict/${ticker}`);
                console.log("API Response:", response.data);

                if (!response.data.predictions) {
                    console.error("Invalid API response: Missing predictions");
                    setError("Invalid API response. Check backend.");
                    return;
                }

                const data = response.data;
                const timestamp = new Date().toLocaleTimeString();
                const closePrice = data.real_time_data.close;  // Use close price instead of log return

                if (isMounted) {
                    setChartData((prev) => {
                        // Ensure datasets exist before updating
                        const updatedData = prev?.datasets?.length
                            ? prev.datasets.map((dataset, index) => ({
                                ...dataset,
                                data: [
                                    ...dataset.data.slice(-50), // Keep last 50 points to prevent overloading
                                    index === 0 ? closePrice : Object.values(data.predictions)[index - 1],
                                ],
                            }))
                            : prev.datasets;

                        return {
                            labels: [...prev.labels.slice(-50), timestamp], // Keep last 50 timestamps
                            datasets: updatedData,
                        };
                    });
                }
            } catch (err) {
                console.error("Error fetching stock data:", err);
                setError("Failed to load data. Check API connection.");
            }
        };

        const interval = setInterval(fetchData, 5000);

        return () => {
            isMounted = false; // Prevent state updates when unmounted
            clearInterval(interval); // Cleanup interval on component unmount
        };
    }, [ticker]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
            y: { beginAtZero: false }
        },
        plugins: {
            legend: { position: "top" },
            tooltip: { enabled: true }
        }
    };

    return (
        <div style={{ width: "90%", height: "400px", maxWidth: "800px", margin: "auto" }}>
            <h2 style={{ textAlign: "center" }}>Stock Price Prediction - {ticker}</h2>
            {error ? <p style={{ color: "red", textAlign: "center" }}>{error}</p> : null}
            {chartData.labels.length ? <Line data={chartData} options={options} /> : <p style={{ textAlign: "center" }}>Loading chart...</p>}
        </div>
    );
};

export default StockChart;
