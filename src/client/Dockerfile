# Stage 1
FROM node:18-alpine3.17 as build
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

#  Stage 2
FROM nginx:stable-alpine
EXPOSE 5173
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
