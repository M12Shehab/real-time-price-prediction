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
        Hi, I'm <b>Mohammed Shehab</b>, a <b>Lead AI Engineer</b> specializing in  
        <a href="https://en.wikipedia.org/wiki/Artificial_intelligence" title="Learn more about AI" target="_blank" rel="noopener noreferrer"> Artificial Intelligence</a>,
        <a href="https://en.wikipedia.org/wiki/Machine_learning" title="Machine Learning Techniques" target="_blank" rel="noopener noreferrer"> Machine Learning</a>,
        and <a href="https://en.wikipedia.org/wiki/Deep_learning" title="Deep Learning Concepts" target="_blank" rel="noopener noreferrer"> Deep Learning</a>.  
        With expertise in 
        <a href="https://www.ibm.com/think/topics/intelligent-automation" title="AI-driven automation in various industries" target="_blank" rel="noopener noreferrer"><b>AI-driven automation</b></a>, 
        <a href="https://www.redhat.com/en/topics/ai/what-is-ai-inference" title="Real-time AI inference techniques" target="_blank" rel="noopener noreferrer"><b>real-time inference</b></a>, 
        and 
        <a href="https://www.pecan.ai/blog/unleashing-big-data-predictive-analytics/" title="Large-scale predictive modeling and AI strategies" target="_blank" rel="noopener noreferrer"><b>large-scale predictive modeling</b></a>,  
        I help companies build 
        <a href="https://cloud.google.com/ai-platform" title="Scalable AI solutions with cloud technology" target="_blank" rel="noopener noreferrer"><b>scalable AI solutions</b></a> 
        across multiple industries.
    </p>

    <h3 style={{ textAlign: 'center', marginTop: '20px' }}>🔹 AI Services Offered</h3>
    <ul style={{ fontSize: "16px", maxWidth: "600px", margin: "auto", textAlign: "left", listStyleType: "square" }}>
        <li><b>Real-Time AI Predictions</b> – 
            <a href="https://www.redhat.com/en/topics/ai/what-is-ai-inference" target="_blank" rel="noopener noreferrer"> AI models for instant decision-making</a> in finance, healthcare, and retail.
        </li>
        <li><b>Batch AI Processing</b> – 
            <a href="https://dzone.com/articles/processing-paradigms-stream-vs-batch-in-the-ai-era" target="_blank" rel="noopener noreferrer">Large-scale predictions</a> for business intelligence and automated reports.
        </li>
        <li><b>Natural Language Processing (NLP)</b> – 
            <a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer"> NLP solutions</a> for text generation, chatbots, and sentiment analysis.
        </li>
        <li><b>Computer Vision</b> – 
            <a href="https://www.ibm.com/think/topics/computer-vision" target="_blank" rel="noopener noreferrer"> AI-powered image recognition</a> for security, healthcare, and industrial applications.
        </li>
        <li><b>AI Model Optimization</b> – 
            <a href="https://developer.nvidia.com/tensorrt" target="_blank" rel="noopener noreferrer"> Model compression and cloud-based AI scaling</a>.
        </li>
    </ul>

    <h3 style={{ textAlign: 'center', marginTop: '20px' }}>🚀 AI Technologies & Tools</h3>
    <p style={{ fontSize: "16px", maxWidth: "600px", margin: "auto" }}>
        My expertise includes:
        <a href="https://xgboost.readthedocs.io/en/stable/" title="XGBoost for AI" target="_blank" rel="noopener noreferrer"> XGBoost</a>, 
        <a href="https://en.wikipedia.org/wiki/Random_forest" title="Random Forest AI" target="_blank" rel="noopener noreferrer"> Random Forest</a>,
        <a href="https://en.wikipedia.org/wiki/Linear_regression" title="Linear Regression AI" target="_blank" rel="noopener noreferrer"> Linear Regression</a>,
        <a href="https://en.wikipedia.org/wiki/Long_short-term_memory" title="LSTM for AI" target="_blank" rel="noopener noreferrer"> LSTM</a>,
        <a href="https://en.wikipedia.org/wiki/Convolutional_neural_network" title="CNN for Image Processing" target="_blank" rel="noopener noreferrer"> CNN</a>, and
        <a href="https://en.wikipedia.org/wiki/Recurrent_neural_network" title="RNN for AI" target="_blank" rel="noopener noreferrer"> RNN</a>.
    </p>

    <p style={{ fontSize: "16px", maxWidth: "600px", margin: "auto" }}>
        As a <b>Lead AI Engineer</b>, I focus on scalable AI solutions and team leadership, ensuring AI projects move from research to production efficiently.
    </p>

    <p style={{ fontSize: "16px", maxWidth: "600px", margin: "auto" }}>
        Feel free to connect with me on:
        <br />
        <a href="https://github.com/M12Shehab" title="GitHub Profile" target="_blank" rel="noopener noreferrer">GitHub</a> | 
        <a href="https://www.linkedin.com/in/mohammed-shehab" title="LinkedIn Profile" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
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
