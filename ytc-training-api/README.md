# HB_Future_base
# Setup with docker UNIX

- docker-compose up -d


# Set up set in server docker:

- docker exec -it hb_future_base_php_1 bash
- composer install
- cp .env.example .env
- php artisan config:clear
- php artisan key:generate
- php artisan migrate

//Phuong
//Các câu lệnh chạy laravel passport
composer require laravel/passport:7.5.1
php artisan migrate
php artisan passport:install
composer require lcobucci/jwt=3.3.3
//EndPhuong

//hieu -- thay đổi kiểu DL column migration
composer require doctrine/dbal:2.*
//