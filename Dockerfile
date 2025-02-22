# Usa una imagen base de PHP con Apache
FROM php:7.4-apache

# Instala las extensiones necesarias
RUN docker-php-ext-install pdo pdo_mysql pdo_sqlite

# Copia el contenido de tu proyecto al contenedor
COPY . /var/www/html/

# Exponer el puerto 80
EXPOSE 80
