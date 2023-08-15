FROM node:16-alpine
WORKDIR /usr/backend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "start"]