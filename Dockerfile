# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./src /app

# Install any needed packages specified in package.json

RUN npm install -g npm@9.5.1 -y
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NODE_ENV=production

# Run the command to start the server
CMD ["npm", "run", "start"]