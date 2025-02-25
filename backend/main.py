from fastapi import FastAPI
from services.prediction import get_prediction
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI
app = FastAPI()

# Enable CORS (Allow frontend requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Only allow frontend requests
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def home():
    return {"message": "Welcome to the Stock Price Prediction API!"}

@app.get("/predict/{ticker}")
def predict_stock(ticker: str):
    """Fetch real-time stock data and make predictions."""
    return get_prediction(ticker)