"""
The prediction service module for making stock price predictions
using real-time data and trained models.
Author: Mohammed Shehab
"""
import joblib
import numpy as np
import yfinance as yf

# Load trained models & scaler
lr_model = joblib.load("./models/lr_all_model.pkl")
rf_model = joblib.load("./models/rf_all_model.pkl")
xgb_model = joblib.load("./models/xgb_all_model.pkl")
scaler = joblib.load("./models/all_scaler.pkl")

def get_real_time_stock_data(ticker="AAPL"):
    """Fetch latest stock data"""
    stock = yf.Ticker(ticker)
    hist = stock.history(period="2d", interval="1m")  # Fetch last 2 days to get previous close

    if hist.empty or len(hist) < 2:
        print(f"No sufficient data available for {ticker}")
        return None

    latest_data = hist.iloc[-1]  # Current (most recent) data
    previous_data = hist.iloc[-2]  # Previous data (for log return)

    # Compute log return
    log_return = np.log(latest_data["Close"] / previous_data["Close"])

    return {
        "open": latest_data["Open"],
        "high": latest_data["High"],
        "low": latest_data["Low"],
        "close": latest_data["Close"],
        "volume": latest_data["Volume"],
        "log_return": log_return
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
        stock_data["log_return"],  # Using log return instead of price change
        stock_data["close"] - stock_data["low"],  # Price momentum
        stock_data["high"] - stock_data["low"],  # Volatility
        stock_data["close"] - stock_data["open"]  # Spread
    ]).reshape(1, -1)

    # Ensure features match the scaler
    features_scaled = scaler.transform(features)

    # Make predictions
    lr_pred_scaled = lr_model.predict(features_scaled)[0]
    rf_pred_scaled = rf_model.predict(features_scaled)[0]
    xgb_pred_scaled = xgb_model.predict(features_scaled)[0]

    # Convert log return prediction back to actual price
    predicted_close_lr = stock_data["close"] * np.exp(lr_pred_scaled)
    predicted_close_rf = stock_data["close"] * np.exp(rf_pred_scaled)
    predicted_close_xgb = stock_data["close"] * np.exp(xgb_pred_scaled)

    return {
        "real_time_data": stock_data,  # Keeps the real closing price format
        "predictions": {
            "linear_regression": round(predicted_close_lr, 2),
            "random_forest": round(predicted_close_rf, 2),
            "xgboost": round(predicted_close_xgb, 2)
        }
    }

# API Endpoint (if using FastAPI)
def get_prediction(ticker: str):
    """API endpoint to fetch real-time data & predict stock price"""
    return predict_price(ticker)
