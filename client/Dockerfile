FROM node:20
WORKDIR /client
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./public ./public
COPY ./src ./src
RUN npm install
EXPOSE 3000
CMD ["npm","run","start"]