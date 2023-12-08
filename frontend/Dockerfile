# Use an official Node runtime as a parent image
FROM node:20.10-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the current directory contents into the container at /app
COPY . .

RUN npm run build

# Expose port 3000 (assuming your Next.js app runs on this port)
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
