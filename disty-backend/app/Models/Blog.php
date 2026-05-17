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
        'konten',
        'kategori',
        'penulis',
        'status',
    ];

    // Auto generate slug dari judul saat create
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($blog) {
            if (empty($blog->slug)) {
                $blog->slug = Str::slug($blog->judul);
            }
        });

        static::updating(function ($blog) {
            $blog->slug = Str::slug($blog->judul);
        });
    }

    // Scope untuk filter published saja (untuk frontend)
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    // Scope untuk filter draft saja (untuk admin)
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }
}