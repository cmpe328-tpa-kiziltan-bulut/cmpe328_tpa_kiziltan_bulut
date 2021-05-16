FROM node:14
RUN mkdir -p /var/apps/api
RUN mkdir -p /var/mongodb/data
WORKDIR /var/apps/api
COPY ["package.json", "package-lock.json", "/var/apps/api/"]
RUN npm install
COPY . /var/apps/api
ENV DB_URI="mongodb://dbroot:5UQVc59w78F4vjYz@mongodb:27017"
ENV API_PORT=4000
ENV JWT_SIGNER_SECRET="JcCYnkMtzq9SEMG"
ENV NODE_ENV="production"
EXPOSE 4000
CMD ["npm", "run", "start"]