# Laravel and Vue Single Page Application Simple Blog

This application can be used as **starter kit** if you want to get started building an single page application with **Laravel** 
and **VueJS**. 
This is a blog using feature like administration, creating and editing posts, commenting, searching posts and many other feature which can be found in most web applications.

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
          laravel-vue-spa-blog$

* Install the packages for laravel:

         laravel-vue-spa-blog$ composer install
          
* Create the .env file :

          laravel-vue-spa-blog$ cp .env.example .env
        
* Generate the encryption key for Laravel :

          laravel-vue-spa-blog$ php artisan key:generate
        

* Change the DB_DATABASE to put database name :

DB_DATABASE=simple-vue-crud

* Load sample records:

          laravel-vue-spa-blog$ php artisan migrate --seed

* Run the Laravel Server in development mode

          laravel-vue-spa-blog$ php artisan serve

* Start client in development mode. You should be able to go to `http://localhost:8000`

* To access to the administration panel, there is a link in the bottom of the page or go to `http://localhost:8000/login`

## License

MIT © 
