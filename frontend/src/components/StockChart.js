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
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);
    const API_URL = process.env.REACT_APP_BACKEND_URL || "http://realtime-backend.eastus.azurecontainer.io:8000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(`Fetching data for ${ticker}...`);
                const response = await axios.get(`${API_URL}/predict/${ticker}`);
                console.log("API Response:", response.data);

                const data = response.data;
                if (!data.predictions) {
                    console.error("Invalid API response: Missing predictions");
                    setError("Invalid API response. Check backend.");
                    return;
                }

                setChartData((prev) => ({
                    labels: [...(prev ? prev.labels : []), new Date().toLocaleTimeString()],
                    datasets: [
                        {
                            label: "Actual Close Price",
                            data: [...(prev ? prev.datasets[0].data : []), data.real_time_data.log_return],
                            borderColor: "gold",
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: "Linear Regression Prediction",
                            data: [...(prev ? prev.datasets[1].data : []), data.predictions.linear_regression],
                            borderColor: "red",
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: "Random Forest Prediction",
                            data: [...(prev ? prev.datasets[2].data : []), data.predictions.random_forest],
                            borderColor: "blue",
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: "Xgboost Prediction",
                            data: [...(prev ? prev.datasets[3].data : []), data.predictions.xgboost],
                            borderColor: "green",
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                }));
            } catch (err) {
                console.error("Error fetching stock data:", err);
                setError("Failed to load data. Check API connection.");
            }
        };

        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
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
            {chartData ? <Line data={chartData} options={options} /> : <p style={{ textAlign: "center" }}>Loading chart...</p>}
        </div>
    );
};

export default StockChart;
