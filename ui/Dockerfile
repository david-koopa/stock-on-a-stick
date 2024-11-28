FROM node:22-slim as stage

WORKDIR /ui
COPY package.json package-lock.json ./
RUN npm install
COPY . .

ENV REACT_APP_API_BASE_URL="http://localhost:8080/api"

RUN npm run build

FROM nginx:1.27.3-alpine-slim

COPY --from=stage /ui/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'
