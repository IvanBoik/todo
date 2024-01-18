FROM node
WORKDIR /app
COPY package.json .
COPY public/ ./public
COPY src/ ./src
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm","start" ]