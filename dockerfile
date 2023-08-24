# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY ["package.json", "package-lock.json*", "./"]

# Install the dependencies specified in package.json
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Set environment variables for PostgreSQL
ENV PGDATABASE=miniestacion
ENV PGUSER=postgres
ENV PGPASSWORD=tycgis
ENV PGHOST=localhost
ENV PGPORT=5432

# Expose the port your Node.js app runs on
EXPOSE 3000

# Start the server by running the server.js file with Node.js
CMD [ "node", "server.js" ]