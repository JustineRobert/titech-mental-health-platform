FROM node:24.15.0-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY src ./src
EXPOSE 5000
CMD ["node", "src/server.js"]
