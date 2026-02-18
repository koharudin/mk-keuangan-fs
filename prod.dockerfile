FROM php:8.2-apache

WORKDIR /var/www

RUN a2enmod rewrite

# System deps
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    p7zip-full \
    libpq-dev \
    zlib1g-dev \
    libzip-dev \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql zip

# ✅ INSTALL REDIS EXTENSION (BENAR)
RUN pecl install redis \
    && docker-php-ext-enable redis

# Composer
RUN curl -sS https://getcomposer.org/installer | php \
    -- --install-dir=/usr/local/bin --filename=composer



# COPY BACKEND (be folder)
COPY be/ /var/www/

# Composer install
COPY be/composer.json be/composer.lock /var/www/
RUN composer update

WORKDIR /var/www   # masih di /var/www

# -----------------------
# COPY Frontend React
# Mount FE folder ke resources/react
COPY fe/ /var/www/resources/react/


WORKDIR /var/www 
RUN npm install
RUN npm run build