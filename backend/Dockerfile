FROM node:16-alpine


# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json 
COPY package.json package-lock.json ./


# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# Expose the port on which your back-end application runs
EXPOSE 3001

# Define the command to run the application
CMD ["node", "server.js"]
