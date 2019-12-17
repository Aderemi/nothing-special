#!/bin/sh

#Install dependencies
composer update

# Migrate database tables
php artisan migrate

#Start the application
php artisan serve