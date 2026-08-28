<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

// Public blog
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post:slug}', [PostController::class, 'show'])->name('posts.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Admin post management
    Route::get('/dashboard/posts', [PostController::class, 'adminIndex'])->name('posts.admin');
    Route::get('/dashboard/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/dashboard/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/dashboard/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('/dashboard/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/dashboard/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

    Route::post('/posts/{post:slug}/comments', [PostController::class, 'storeComment'])->name('posts.comments.store');
});

require __DIR__.'/settings.php';