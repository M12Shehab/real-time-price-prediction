import React, { useState } from "react";
import StockChart from "../components/StockChart";

const Home = () => {
    const [ticker, setTicker] = useState("AAPL");

    return (
        <div>
            
            <center>
                <label>Select Stock: </label>
            
            <select onChange={(e) => setTicker(e.target.value)} value={ticker}>
                <option value="AAPL">Apple (AAPL)</option>
                <option value="MSFT">Microsoft (MSFT)</option>
                <option value="GOOGL">Google (GOOGL)</option>
                <option value="AMZN">Amazon (AMZN)</option>
            </select>
            </center>
            <StockChart ticker={ticker} />
        </div>
    );
};

export default Home;
