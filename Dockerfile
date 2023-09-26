FROM node:14
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

EXPOSE 3000

# Define environment variables
# ENV NODE_ENV=production
# ENV PORT=
# ENV MONGO_DB_USER=
# ENV MONGO_DB_PASS=
# ENV MONGO_DB_DB=
# ENV MONGO_DB_PORT=


# Start the Nest.js application
CMD ["npm", "start"]