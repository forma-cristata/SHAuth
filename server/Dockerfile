# Use the official Node.js image
FROM node:20

# Create and change to the app directory
WORKDIR /server

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy application code to the container image
COPY . .

# Expose the port the app runs on
EXPOSE 3012

# Run the web service on container startup
CMD [ "node", "server.mjs" ]