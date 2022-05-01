# Laravel and Vue Single Page Application Simple Blog

This application can be used as **starter kit** if you want to get started building an single page application with **Laravel** 
and **VueJS**. 

## Technologies

### Frontend

* [VueJS](https://fr.vuejs.org/index.html) - A JavaScript framework for building great user interfaces.
* [Bootstrap 5](https://getbootstrap.com) - Bootstrap is the most used CSS framework.


## Features

* CRUD (create / read / update / delete) on posts
* CRUD (create / read / update / delete ) on  categories
* Pagination on posts and categories listing
* Live Search on posts
* Live Search on categories
* Live Filter with category on posts list
* 

## Getting Started

* Clone the project from Github

          $ git clone https://github.com/juvpengele/laravel-vue-spa-blog
          $ cd simple-blog-vue-laravel
          simple-blog-vue-laravel$

* Install the packages for laravel:

         laravel-vue-spa-blog$ composer install
          
* Create the .env file :

           simple-blog-vue-laravel$ cp .env.example .env
        
* Generate the encryption key for Laravel :

           simple-blog-vue-laravel$ php artisan key:generate
        

* Change the DB_DATABASE to put database name :

DB_DATABASE=simple-vue-crud

* Load sample records:

           simple-blog-vue-laravel$ php artisan migrate --seed

* Run the Laravel Server in development mode

           simple-blog-vue-laravel$ php artisan serve

* Start client in development mode. You should be able to go to `http://localhost:8000`

* To access to the administration panel, there is a link in the bottom of the page or go to `http://localhost:8000/login`

## License

MIT © 
