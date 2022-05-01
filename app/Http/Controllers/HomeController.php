<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Database\Eloquent\Collection;

class HomeController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {

       $posts = Category::with(['posts' => function($q){
           $q->where('published', 1);
       }])->withCount('posts')->get();

       return response()->json($posts);

    }
}
