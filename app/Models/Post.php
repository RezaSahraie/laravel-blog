<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

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
     * Extra attributes appended to the model's array/JSON form,
     * so the frontend always receives a ready-to-use image URL.
     *
     * @var list<string>
     */
    protected $appends = [
        'cover_image_url',
    ];

    /**
     * Resolve the stored cover image path into a full public URL.
     */
    protected function coverImageUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->cover_image ? Storage::disk('public')->url($this->cover_image) : null,
        );
    }

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
