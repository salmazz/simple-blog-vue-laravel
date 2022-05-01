/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

 require('./bootstrap');

 import Vue from 'vue';
 import VueRouter from 'vue-router';
 import App from './components/App';
 import Home from './components/Home';
 Vue.component('pagination', require('laravel-vue-pagination'));
 import ToggleButton from 'vue-js-toggle-button'



 Vue.config.productionTip = false

 Vue.use(ToggleButton)

 import PostIndex from './components/Posts/index';
 import PostCreate from './components/Posts/create';
 import PostEdit from './components/Posts/edit';

 import CategoryIndex from './components/Categories/index';
 import CategoryCreate from './components/Categories/create';
 import CategoryEdit from './components/Categories/edit';

 Vue.use(VueRouter)

 const routes = [
     {
         path:'/',
         component: Home,
         name : 'Home'
     },
     {
         path:'/posts/index',
         component: PostIndex,
         name : 'posts.index'
     },
     {
         path:'/posts/create',
         component: PostCreate,
         name: 'posts.create'
     },
     {
         path:'/posts/edit',
         component: PostEdit,
         name: 'posts.edit'
     },
     {
         path:'/categories/',
         component: CategoryIndex,
         name: 'categories.index'
     },{
         path:'/categories/create',
         component: CategoryCreate,
         name : 'categories.create'
     },
     {
         path: "/categories/edit",
         component: CategoryEdit,
         name: "categories.edit"
     }
 ];


 /**
  * Next, we will create a fresh Vue application instance and attach it to
  * the page. Then, you may begin adding components to this application
  * or customize the JavaScript scaffolding to fit your unique needs.
  */

  const router = new VueRouter({
     routes,
     mode :'history',

 });


 const app = new Vue({
     el:'#app',
     components : { App },
     router,
     render: h => h(App)
 });
