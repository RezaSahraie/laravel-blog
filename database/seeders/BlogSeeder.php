<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user (or create one if none exists)
        $user = User::first() ?? User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => '12345678'
        ]);

        // Create categories
        $categories = [
            ['name' => 'Laravel', 'slug' => 'laravel'],
            ['name' => 'React', 'slug' => 'react'],
            ['name' => 'Docker', 'slug' => 'docker'],
            ['name' => 'Tips', 'slug' => 'tips'],
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(['slug' => $cat['slug']], $cat);
        }

        // Create sample posts
        $posts = [
            [
                'title' => 'Getting Started with Laravel 13 and Inertia',
                'excerpt' => 'A practical introduction to building modern apps with Laravel 13, Inertia and React.',
                'content' => '<p>Laravel 13 brings many improvements. In this post we explore how to set up a clean project with Inertia and React.</p><p>We will cover routing, controllers and the frontend structure.</p>',
                'category' => 'laravel',
            ],
            [
                'title' => 'Why Docker and Sail Make Development Easier',
                'excerpt' => 'Learn how Laravel Sail simplifies local development with Docker.',
                'content' => '<p>Sail is the official way to run Laravel with Docker. It removes a lot of configuration pain.</p><p>In this article we look at the most useful Sail commands.</p>',
                'category' => 'docker',
            ],
            [
                'title' => 'Building Beautiful UIs with Tailwind and React',
                'excerpt' => 'Tips for creating modern and elegant interfaces using Tailwind CSS.',
                'content' => '<p>Tailwind makes it easy to build consistent designs. Combined with React you can create very polished interfaces.</p>',
                'category' => 'react',
            ],
            [
                'title' => 'Small Tips for Cleaner Laravel Code',
                'excerpt' => 'A collection of simple practices that make your Laravel code more maintainable.',
                'content' => '<p>Using query scopes, form requests and proper naming can improve readability a lot.</p>',
                'category' => 'tips',
            ],
        ];

        foreach ($posts as $data) {
            $category = Category::where('slug', $data['category'])->first();

            Post::create([
                'user_id' => $user->id,
                'category_id' => $category->id,
                'title' => $data['title'],
                'slug' => Str::slug($data['title']),
                'excerpt' => $data['excerpt'],
                'content' => $data['content'],
                'is_published' => true,
                'published_at' => now()->subDays(rand(1, 20)),
            ]);
        }
    }
}