# FROM node:22.3.0-alpine3.20 AS build

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh
# EXPOSE 80
# CMD ["/entrypoint.sh"]

# FROM node:22.3.0-alpine3.20 AS build

# # Aceptar el argumento de construcción
# ARG VITE_API_BASE_URL

# # Crear un archivo .env con el valor del argumento
# RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:22.3.0-alpine3.20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]