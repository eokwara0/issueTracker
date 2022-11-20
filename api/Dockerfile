FROM node:latest
WORKDIR /app
COPY ["package.json" , "package-lock.json","./"]
RUN npm install -y
COPY . .
EXPOSE 3000
VOLUME ["/home/eokwara/app" , "/app"]
CMD [ "node"  , "./server.js" ]
