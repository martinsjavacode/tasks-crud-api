# CREATE DOCKERFILE FOR BACKEND
# Use the official Node.js image as a base
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Install corepack and set up Yarn
RUN npm install -g corepack && \
    yarn set version stable && \
    yarn install

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install dependencies
RUN yarn

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
