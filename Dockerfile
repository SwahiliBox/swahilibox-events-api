FROM node:9-slim
WORKDIR /src
COPY package.json /src
RUN npm install
COPY . /src
CMD ["npm", "start"]

