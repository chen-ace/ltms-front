# build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install && npm run build


# production stage
FROM nginx:1.25.4 as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]