# Use the latest Node.js image as the base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY ["package.json", "package-lock.json*", "./"]

# Install the dependencies specified in package.json
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Start the server by running the server.js file with Node.js
CMD [ "node", "server.js" ]