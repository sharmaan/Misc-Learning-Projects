import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Generate some data
np.random.seed(0)
X = 2.5 * np.random.randn(100) + 1.5   # Array of 100 values with mean = 1.5, stddev = 2.5
res = 0.5 * np.random.randn(100)       # Generate 100 residual terms
y = 2 + 0.3 * X + res                  # Actual values of Y

# Reshape X for the model
X = X.reshape(-1, 1)

# Fit linear regression model
model = LinearRegression()
model.fit(X, y)

# Make predictions
X_predict = np.linspace(min(X), max(X), 100).reshape(-1, 1)  # Predict values from min to max of X
y_predict = model.predict(X_predict)

# Plotting the results
plt.figure(figsize=(10, 6))
plt.scatter(X, y, color='blue', label='Actual data')  # Plot the actual data
plt.plot(X_predict, y_predict, color='red', label='Model prediction')  # Plot the model's predictions
plt.title('Simple Linear Regression')
plt.xlabel('X')
plt.ylabel('Y')
plt.legend()
plt.show()
