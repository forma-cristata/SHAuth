# Use the official Node.js image
FROM node:20

# Create and change to the app directory
WORKDIR /client

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code to the container image
COPY . .

# Build the Angular app
RUN npm run build

# Expose the port the app runs on
EXPOSE 4912

# Start the Angular app
CMD [ "npm", "start" ]
