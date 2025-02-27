import React, { useState } from "react";
import StockChart from "../components/StockChart";

const Home = () => {
    const [ticker, setTicker] = useState("AAPL");

    return (
        <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "20px" }}>
            {/* Professional Header */}
            <header style={{ padding: "10px", background: "#282c34", color: "white", fontSize: "24px" }}>
                <h1>Real-Time Stock Price Prediction</h1>
                <p>Track stock prices and model predictions live!</p>
            </header>

            {/* Stock Selection */}
            <div style={{ margin: "20px 0" }}>
                <label style={{ fontSize: "18px", fontWeight: "bold", marginRight: "10px" }}>Select Stock: </label>
                <select 
                    onChange={(e) => setTicker(e.target.value)} 
                    value={ticker} 
                    style={{ fontSize: "16px", padding: "5px", borderRadius: "5px" }}
                >
                    <option value="AAPL">Apple (AAPL)</option>
                    <option value="MSFT">Microsoft (MSFT)</option>
                    <option value="GOOGL">Google (GOOGL)</option>
                    <option value="AMZN">Amazon (AMZN)</option>
                </select>
            </div>

            {/* Stock Chart Component */}
            <StockChart ticker={ticker} />

            {/* About Section */}
            <section style={{ marginTop: "40px", padding: "20px", background: "#f4f4f4", borderRadius: "10px", width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                <h2>About the Developer</h2>
                <p style={{ fontSize: "16px", maxWidth: "600px", margin: "auto" }}>
                    Hi, I'm <b>Mohammed Shehab</b>, a passionate software developer specializing in **machine learning, financial modeling, and full-stack development**. 
                    This project is designed to provide **real-time stock price predictions** using advanced ML models such as **XGBoost, Random Forest, and Linear Regression**.
                </p>
                <p style={{ fontSize: "16px", maxWidth: "600px", margin: "auto" }}>
                    Feel free to connect with me on:
                    <br />
                    <a href="https://github.com/M12Shehab" target="_blank" rel="noopener noreferrer">GitHub</a> | 
                    <a href="https://www.linkedin.com/in/mohammed-shehab" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
                </p>
            </section>

            {/* Footer */}
            <footer style={{ marginTop: "20px", padding: "10px", background: "#282c34", color: "white", fontSize: "14px" }}>
                &copy; {new Date().getFullYear()} Mohammed Shehab. All Rights Reserved.
            </footer>
        </div>
    );
};

export default Home;
