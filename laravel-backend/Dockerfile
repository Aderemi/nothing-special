FROM php:7.3-fpm

RUN php -r "readfile('https://getcomposer.org/installer');" | php &&\
    mv composer.phar /usr/bin/composer && chmod +x /usr/bin/composer

EXPOSE 8000

WORKDIR /app

COPY . /app

RUN chmod +x ./docker/start.sh

CMD ./docker/start.sh
