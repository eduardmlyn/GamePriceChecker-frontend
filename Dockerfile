FROM node:20-alpine3.16 as builder

# Run with lower privileges
RUN addgroup -S builderGroup && adduser -S builderUser -G builderGroup
USER builderUser:builderGroup

# Create work directory
COPY . /app
WORKDIR /app

# Build application
RUN npm install
RUN npm run build

FROM nginx:1.24-alpine

# Expose port 80
EXPOSE 80

# Copy dist to image
COPY --from=builder /app/dist/game-price-checker-frontend /usr/share/nginx/html

# Copy configuration of nginx to image
COPY nginx.conf /etc/nginx/conf.d/default.conf
