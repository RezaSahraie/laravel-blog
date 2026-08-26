<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a paginated list of published posts.
     */
    public function index(): Response
    {

        $posts = Post::query()
            ->where('is_published', true)   // Only include posts that have been published
            ->with(['user', 'category'])    // Fetch posts with their related user (author) and category data.
            ->latest('published_at')     // Order by the latest publication date (newest first)
            ->paginate(10);     // Paginate results with 10 posts per page

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
        ]);
    }

    
    /**
     * Display a single published post with its related data.
     *
     * This method shows the full details of a specific post, but only if
     * the post is published. It also loads the author, category, and
     * approved comments with their respective users.
     *
     * @param Post $post The post model instance resolved via route model binding
     * @return Response
     */
    public function show(Post $post): Response
    {
        // If the post is not published, return a 404 Not Found response
        if (! $post->is_published) {
            abort(404);
        }

        /** 
         * Load additional relationships for the post:
         * - 'user' : the author of the post
         * - 'category' : the category the post belongs to
         * - 'comments.user' : all comments, and for each comment, the user who wrote it
         */
        $post->load(['user', 'category', 'comments.user']);

        
        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }
}