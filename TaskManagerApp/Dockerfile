# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Install expo-cli globally
RUN npm install -g expo-cli

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Set environment variable to disable telemetry (optional)
ENV EXPO_NO_TELEMETRY=1

# Expose Expo development server ports
EXPOSE 8081 19000 19001 19002

# Start Expo
CMD ["npx", "expo", "start", "--tunnel"]
