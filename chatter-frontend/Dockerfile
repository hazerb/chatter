FROM node:latest AS builder
# Set working directory
WORKDIR /app
# Copy package json and yarn lock to install dependincies first (caching best practice)
COPY ["package.json", "package-lock.json", "./"]
# Install dependencies
RUN npm install
# Copy all files from current directory to working dir in image
COPY . .
# build assets
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
# redirect routes to index.html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
# TRAVIS MODIFIED 2