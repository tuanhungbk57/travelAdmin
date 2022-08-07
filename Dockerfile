## Stage 1: angular codebase
## Use official node image as the base image
FROM node:latest as build

WORKDIR /app

## Copy source code
COPY . /app/

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/nth.travel-admin /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80