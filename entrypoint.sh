#!/bin/sh

# Reemplaza las variables de entorno en los archivos de configuración
envsubst '${VITE_API_BASE_URL}' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.tmp
mv /usr/share/nginx/html/index.html.tmp /usr/share/nginx/html/index.html

# Inicia Nginx
exec nginx -g 'daemon off;'
