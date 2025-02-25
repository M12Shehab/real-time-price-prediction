"""The prediction service module for making stock price predictions
    using real-time data and trained models.
    Author: Mohammed Shehab    
"""
import joblib
import numpy as np
# import pandas as pd
import yfinance as yf
# from fastapi import FastAPI

# Load trained models & scaler
lr_model = joblib.load("./models/lr_all_model.pkl")
rf_model = joblib.load("./models/rf_all_model.pkl")
scaler = joblib.load("./models/all_scaler.pkl")

# app = FastAPI()

def get_real_time_stock_data(ticker="AAPL"):
    """Fetch latest stock data"""
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1d", interval="1m")  # 1-minute interval

    if hist.empty:
        print(f"No data available for {ticker}")
        return None

    latest_data = hist.iloc[-1]

    return {
        "open": latest_data["Open"],
        "high": latest_data["High"],
        "low": latest_data["Low"],
        "close": latest_data["Close"],
        "volume": latest_data["Volume"]
    }

def predict_price(ticker="AAPL"):
    """Make a prediction using real-time data"""
    stock_data = get_real_time_stock_data(ticker)
    
    if stock_data is None:
        return {"error": "No real-time data available"}

    # Ensure volume is not zero (to prevent division errors)
    if stock_data["volume"] == 0:
        stock_data["volume"] = 1  # Set a small nonzero value

    # Prepare features for prediction
    features = np.array([
        stock_data["volume"],
        (stock_data["close"] - stock_data["open"]) / stock_data["open"],  # Price change
        stock_data["close"] - stock_data["low"],  # Price momentum
        stock_data["high"] - stock_data["low"],  # Volatility
        stock_data["close"] - stock_data["open"]  # Spread
    ]).reshape(1, -1)

    # Ensure features match the scaler
    features_scaled = scaler.transform(features)

    # Make predictions
    lr_pred_scaled = lr_model.predict(features_scaled)[0]
    rf_pred_scaled = rf_model.predict(features_scaled)[0]

    # Create a full feature array for inverse transformation
    inverse_features = np.zeros((1, 5))  # Must match the number of features used in training
    inverse_features[0, -1] = lr_pred_scaled  # Set prediction value in last column
    lr_pred = scaler.inverse_transform(inverse_features)[0][-1]  # Convert back to real scale

    inverse_features[0, -1] = rf_pred_scaled  # Repeat for RF model
    rf_pred = scaler.inverse_transform(inverse_features)[0][-1]

    return {
        "real_time_data": stock_data,  # Keeps the real closing price format
        "predictions": {
            "linear_regression": round(lr_pred, 2),
            "random_forest": round(rf_pred, 2)
        }
    }


# @app.get("/predict/{ticker}")
def get_prediction(ticker: str):
    """API endpoint to fetch real-time data & predict stock price"""
    return predict_price(ticker)
