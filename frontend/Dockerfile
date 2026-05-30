FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27-alpine

# Install gettext for envsubst
RUN apk add --no-cache gettext

COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/mk-ai-command-center/browser /usr/share/nginx/html

EXPOSE 80

# envsubst replaces BACKEND_HOST in nginx.conf at startup, then starts nginx
CMD ["/bin/sh", "-c", "envsubst '${BACKEND_HOST}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
