<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'cover_image',
        'is_published',
        'published_at',
    ];
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Get the user that owns the post.
     */
    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }
    /**
     * Get the category that owns the post.
     */
    public function category() : BelongsTo {
        return $this->belongsTo(Category::class);
    }
    /**
     * Get the comments for the post.
     */
    public function comments() : HasMany {
        return $this->hasMany(Comment::class);
    }
}
