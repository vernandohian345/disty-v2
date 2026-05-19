<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blog extends Model
{
    protected $fillable = [
        'judul',
        'slug',
        'sampul',
        'description',
        'konten',
        'kategori',
        'penulis',
        'status',
        'views',
        'published_at',
        'read_time',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    // Auto generate slug dari judul saat create
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($blog) {

            // Auto slug
            if (empty($blog->slug)) {
                $blog->slug = Str::slug($blog->judul);
            }

            // Auto read_time dari panjang konten (rata-rata 200 kata/menit)
            $wordCount = str_word_count(strip_tags($blog->konten));
            $blog->read_time = max(1, ceil($wordCount / 200));

            // Auto published_at saat status published
            if ($blog->status === 'published' && empty($blog->published_at)) {
                $blog->published_at = now();
            }

        });

        static::updating(function ($blog) {

            // Update slug
            $blog->slug = Str::slug($blog->judul);

            // Update read_time
            $wordCount = str_word_count(strip_tags($blog->konten));
            $blog->read_time = max(1, ceil($wordCount / 200));

            // Set published_at saat pertama kali dipublish
            if (
                $blog->status === 'published' &&
                empty($blog->published_at)
            ) {
                $blog->published_at = now();
            }

        });
    }
}