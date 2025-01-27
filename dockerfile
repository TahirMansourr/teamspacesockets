# Use the Node.js LTS base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the application code
COPY . .

# Expose the port for Cloud Run
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
