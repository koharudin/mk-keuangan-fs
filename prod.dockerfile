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
RUN composer install --no-dev

WORKDIR /var/www   # masih di /var/www

# -----------------------
# COPY Frontend React
# Mount FE folder ke resources/react
COPY fe/ /var/www/resources/react/


WORKDIR /var/www 
RUN npm install
RUN npm run build


# -----------------------
# Set Apache DocumentRoot ke public/
RUN sed -i 's|/var/www/html|/var/www/public|g' /etc/apache2/sites-available/000-default.conf

# Set permission /tmp agar writable
RUN chmod 1777 /tmp

RUN mkdir -p /var/www/storage/tmp \
    && chown -R www-data:www-data /var/www/storage/tmp
ENV TMPDIR=/var/www/storage/tmp

# ===============================
# Laravel permission & Passport
# ===============================
RUN mkdir -p storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/framework/tmp \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Generate APP_KEY jika belum ada
RUN php artisan key:generate --force || true

# Generate Passport keys
RUN php artisan passport:keys --force || true

RUN  chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

RUN chmod 600 storage/oauth-private.key storage/oauth-public.key
RUN chown www-data:www-data storage/oauth-private.key storage/oauth-public.key

