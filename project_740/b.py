import pandas as pd
import yfinance as yf
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
from sklearn.metrics import mean_squared_error
import numpy as np
from sklearn.metrics import mean_squared_error

# Fetch historical data for a stock (e.g., Google)
ticker_symbol = "GOOGL"
stock_data = yf.download(ticker_symbol, start="2010-01-01", end="2025-01-01")

# print("shape of the data",stock_data.shape)
# Display the first few rows of the data
print(stock_data.head())

###############
stock_data['Numerical Index'] = np.arange(len(stock_data))
X = stock_data['Numerical Index'].values.reshape(-1, 1)
y = stock_data['Close'].values
################

# Create a new column 'Prev Close' which is the 'Close' shifted by one day
# stock_data['Prev Close'] = stock_data['Close'].shift(1)

# Drop the first row as it now contains NaN
stock_data = stock_data.dropna()

# print(stock_data[['Close', 'Prev Close']].head())

##Split the data into training and testing sets. Typically, we use 80% of the data for training and 20% for testing.
# X = stock_data[['Prev Close']]
# y = stock_data['Close']



X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

print(type(y_test))

##Linear regression model from scikit learn

model = LinearRegression()
model.fit(X_train, y_train)

##make predictions and evaluate midel by using Root mean square error (RMSE)


# Predict the stock prices
y_pred_train = model.predict(X_train)
predictions = model.predict(X_test)
y_pred_test = model.predict(X_test)

# Calculate the RMSE
rmse = np.sqrt(mean_squared_error(y_test, predictions))
print("Root Mean Squared Error:", rmse)

#  plot the predictions against the actual values

# plt.figure(figsize=(10, 6))
# plt.plot(y_test.index, y_test, label='Actual Price') ##value error
# plt.plot( y_test, y_test, label='Actual Price')
# plt.plot(y_test.index, predictions, label='Predicted Price', color='red')
# plt.title('Stock Price Prediction')
# plt.xlabel('Date')
# plt.ylabel('Price')
# plt.legend()
# plt.show()

# Plotting the results
plt.figure(figsize=(14, 7))
plt.scatter(X_train, y_train, color='blue', label='Actual prices (Train)', alpha=0.5)
plt.scatter(X_test, y_test, color='green', label='Actual prices (Test)', alpha=0.5)
plt.plot(X_train, y_pred_train, color='red', label='Model prediction (Train)')
plt.plot(X_test, y_pred_test, color='orange', label='Model prediction (Test)')
plt.title(f'Linear Regression on {ticker_symbol} Stock Prices')
plt.xlabel('Date Index')
plt.ylabel('Closing Price')
plt.legend()
plt.show()



