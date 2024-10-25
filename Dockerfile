# Start with a base image containing Python runtime
FROM python:3.10-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    solc \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Cython first
RUN pip install cython

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Define environment variable
ENV NAME=World

# Run app.py when the container launches
CMD ["python", "src/app.py"]