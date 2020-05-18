# Ref: https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/
# Author: jackg-ch

FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Run the application
EXPOSE 4000
CMD ["npm", "run", "serverstart"]


### Notes
# Build this image: docker build -t <your username>/<node-app-name> .
# Run this image: docker run -p <public-port>:4000 -d <your username>/<node-app-name>