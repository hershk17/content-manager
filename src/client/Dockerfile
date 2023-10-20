FROM node:18-alpine3.17 as build

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 5173
CMD [ "nginx", "-g", "daemon off;" ]