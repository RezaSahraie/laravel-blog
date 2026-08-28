<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Requests\StoreCommentRequest;

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
        $post->load([
            'user', 
            'category', 
            'comments' => function ($query) {
                $query->where('is_approved', true)
                ->with('user')->latest();
            }
        ]);

        
        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Display a paginated list of posts for the authenticated admin user.
     * Only shows posts that belong to the currently logged-in user.
     *
     * @param Request $request The HTTP request instance
     * @return Response The Inertia response rendering the admin index page
     */
    public function adminIndex(Request $request): Response{
        $posts = Post::query()
            ->where('user_id', $request->user()->id)     // Filter posts to only those belonging to the authenticated user
            ->with('category')     // Eager load the category relationship to avoid N+1 queries
            ->latest()      // Order by latest posts first (newest to oldest)
            ->paginate(10);     // Paginate results with 10 posts per page

        return Inertia::render('Posts/Admin/Index',[
            'posts' => $posts,
        ]);
    }

    /**
     * Display the form for creating a new post.
     * Loads all categories for the dropdown selection.
     *
     * @return Response The Inertia response rendering the create form page
     */
    public function create(): Response{
        return Inertia::render('Posts/Admin/Create',[
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created post in the database.
     * Handles validation, slug generation, and publication status.
     *
     * @param Request $request The HTTP request containing post data
     * @return RedirectResponse Redirect to admin index with success message
     */
    public function store(StorePostRequest $request): RedirectResponse {
        // Validate all incoming request data
        $validated = $request->validated();

        // Create the new post with validated data
        $post = Post::create([
            'user_id' => $request->user()->id,
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']).'-'.Str::random(5),
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'cover_image' => $validated['cover_image'] ?? null,
            'is_published' => $validated['is_published'] ?? false,
            'published_at' => ($validated['is_published'] ?? false) ? now() : null,
        ]);

        return redirect()
            ->route('posts.admin')
            ->with('success', 'Post created successfully.');
    }

    /**
     * Display the form for editing an existing post.
     * Includes authorization check to ensure user owns the post.
     *
     * @param Post $post The post model instance (route model binding)
     * @return Response The Inertia response rendering the edit form page
     */
    public function edit(Post $post): Response {
        // Authorization check: ensure the authenticated user owns this post
        if ($post->user_id !== Auth::id()) {
            abort(403);     // Forbidden - user doesn't own this post
        }

        return Inertia::render('Posts/Admin/Edit', [
            'post' => $post,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    /**
     * Update the specified post in the database.
     * Validates input, updates all fields, and maintains publication consistency.
     *
     * @param Request $request The HTTP request containing updated data
     * @param Post $post The post model instance to update (route model binding)
     * @return RedirectResponse Redirect to admin index with success message
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse {
        
        // Validate all incoming request data (same rules as store)
        $validated = $request->validated();     // Ownership is already checked in UpdatePostRequest::authorize()

        // Update the post with validated data
        $post->update([
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'cover_image' => $validated['cover_image'] ?? null,
            'is_published' => $validated['is_published'] ?? false,
            // Preserve existing published_at if already published, otherwise set to now
            'published_at' => ($validated['is_published'] ?? false) ? ($post->published_at ?? now()) : null,
        ]);

        return redirect()
            ->route('posts.admin')
            ->with('success', 'Post updated successfully.');
    }

    /**
     * Delete the specified post.
     * Includes authorization check and permanent deletion.
     *
     * @param Post $post The post model instance to delete (route model binding)
     * @return RedirectResponse Redirect to admin index with success message
     */
    public function destroy(Post $post): RedirectResponse{
        // Authorization check: ensure the authenticated user owns this post
        if ($post->user_id !== Auth::id()) {
            abort(403);     // Forbidden - user doesn't own this post
        }

        $post->delete();    // Permanently delete the post from the database
        return redirect()
            ->route('posts.admin')
            ->with('success', 'Post deleted successfully.');
    }

    public function storeComment(StoreCommentRequest $request, Post $post): RedirectResponse {
        if (! $post->is_published) {
            abort(404);
        }

        $validated = $request->validated();

        $post->comments()->create([
            'user_id' => $request->user()?->id,
            'body' => $validated['body'],
            'is_approved' => true,
        ]);

        return redirect()
        ->route('posts.show', $post)
        ->with('success', 'Comment added.');
    }
}