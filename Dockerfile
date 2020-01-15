FROM keymetrics/pm2:10-alpine

# Bundle APP files
COPY ./dist /app/dist
COPY package.json /app
COPY pm2.json /app

WORKDIR /app

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Show current folder structure in logs
RUN ls -al

EXPOSE 3210

CMD [ "npm", "start"]
