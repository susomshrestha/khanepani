# SET THE BASE IMAGE
FROM node:18.16.0-alpine3.17

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the server port
EXPOSE 5001

# Start the development server
CMD ["npm", "run", "start"]
