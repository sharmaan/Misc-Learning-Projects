import numpy as np
import matplotlib.pyplot as plt
import yfinance as yf
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from datetime import datetime

# Define a function to calculate days since 1900
def days_since_1900(date):
    base_date = datetime(1900, 1, 1)
    delta = date - base_date
    return delta.days

# Fetch historical stock price data
ticker_symbol = 'AAPL'
data = yf.download(ticker_symbol, start='2010-01-01', end='2020-01-01')

# Add a 'Days Since 1900' column
data['Days Since 1900'] = [days_since_1900(d.da.date()) for d in data.index]

# Prepare data for regression
X = data['Days Since 1900'].values.reshape(-1, 1)
y = data['Close'].values

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

# Fit linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred_train = model.predict(X_train)
y_pred_test = model.predict(X_test)

# Plotting the results
plt.figure(figsize=(14, 7))
plt.scatter(X_train, y_train, color='blue', label='Actual prices (Train)', alpha=0.5)
plt.scatter(X_test, y_test, color='green', label='Actual prices (Test)', alpha=0.5)
plt.plot(X_train, y_pred_train, color='red', label='Model prediction (Train)')
plt.plot(X_test, y_pred_test, color='orange', label='Model prediction (Test)')
plt.title('Linear Regression on Apple Stock Prices')
plt.xlabel('Days Since 1900')
plt.ylabel('Closing Price')
plt.legend()
plt.show()
