FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# COMANDO NGIX POR DEFECTO
CMD ["nginx", "-g", "daemon off;"]
