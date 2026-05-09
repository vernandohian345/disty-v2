@extends('frontend.app')

@push('styles')
    <style>
        .notifications-page {
            background: #f8f9fa;
            min-height: 100vh;
            padding: 40px 0;
        }

        .notifications-header {
            background: linear-gradient(135deg, #5239f1 0%, #ff8400 100%);
            color: white;
            padding: 2rem 0;
            border-radius: 15px;
            margin-bottom: 30px;
        }

        .notification-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
            border-left: 4px solid var(--primary-orange);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .notification-card:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .notification-card.unread {
            background: #fff9e6;
            border-left-width: 5px;
        }

        .notification-card.read {
            background: white;
            opacity: 0.8;
            border-left-color: #ddd;
        }

        .notification-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            flex-shrink: 0;
        }

        .notification-icon.success {
            background: #d4edda;
            color: #155724;
        }

        .notification-icon.warning {
            background: #fff3cd;
            color: #856404;
        }

        .notification-icon.info {
            background: #d1ecf1;
            color: #0c5460;
        }

        .notification-icon.primary {
            background: #cce5ff;
            color: #004085;
        }

        .notification-content {
            flex: 1;
            padding: 0 15px;
        }

        .notification-title {
            font-weight: 700;
            color: #333;
            margin-bottom: 5px;
            font-size: 1rem;
        }

        .notification-message {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 8px;
            line-height: 1.5;
        }

        .notification-time {
            font-size: 0.75rem;
            color: #999;
        }

        .notification-actions {
            display: flex;
            gap: 5px;
            flex-shrink: 0;
        }

        .btn-icon {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            transition: all 0.3s ease;
        }

        .btn-icon:hover {
            transform: scale(1.1);
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
        }

        .empty-state i {
            font-size: 5rem;
            color: #ddd;
            margin-bottom: 20px;
        }

        .badge-unread {
            background: #ff8400;
            color: white;
            border-radius: 20px;
            padding: 5px 12px;
            font-size: 0.85rem;
            font-weight: 600;
        }

        .filter-tabs {
            background: white;
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .filter-tabs .nav-link {
            border: none;
            color: #666;
            font-weight: 600;
            padding: 8px 20px;
            border-radius: 20px;
            transition: all 0.3s ease;
        }

        .filter-tabs .nav-link.active {
            background: var(--primary-orange);
            color: white;
        }

        .filter-tabs .nav-link:hover:not(.active) {
            background: #f8f9fa;
        }
    </style>
@endpush

@section('title', 'Disty Akademi - Notifikasi')

@section('content')

<div class="notifications-page">
    <div class="container">

        <!-- Header -->
        <div class="notifications-header">
            <div class="d-flex justify-content-between align-items-center px-4">
                <div>
                    <h2 class="mb-1">
                        <i class="fas fa-bell me-2"></i>
                        Notifikasi
                    </h2>
                    <p class="mb-0 opacity-75">Pantau semua aktivitas dan pembaruan Anda</p>
                </div>
                @if($unreadCount > 0)
                    <span class="badge-unread">
                        {{ $unreadCount }} Belum Dibaca
                    </span>
                @endif
            </div>
        </div>

        <!-- Filter & Actions -->
        <div class="filter-tabs">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <ul class="nav nav-pills mb-0" id="filterTabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="pill" href="#semua">
                            Semua
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="pill" href="#belum-dibaca">
                            Belum Dibaca ({{ $unreadCount }})
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="pill" href="#sudah-dibaca">
                            Sudah Dibaca
                        </a>
                    </li>
                </ul>

                @if($unreadCount > 0)
                    <form action="{{ route('notifications.readAll') }}" method="POST" class="d-inline">
                        @csrf
                        <button type="submit" class="btn btn-sm btn-outline-secondary">
                            <i class="fas fa-check-double me-1"></i>
                            Tandai Semua Dibaca
                        </button>
                    </form>
                @endif
            </div>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">

            <!-- Tab: Semua -->
            <div class="tab-pane fade show active" id="semua">
                @forelse($notifications as $notif)
                    <div class="notification-card {{ $notif->is_read ? 'read' : 'unread' }}"
                         onclick="window.location='{{ route('notifications.read', $notif->id) }}'">
                        <div class="d-flex align-items-start">
                            <!-- Icon -->
                            <div class="notification-icon {{ $notif->color }}">
                                <i class="{{ $notif->icon }}"></i>
                            </div>

                            <!-- Content -->
                            <div class="notification-content">
                                <div class="notification-title">
                                    {{ $notif->title }}
                                    @if(!$notif->is_read)
                                        <span class="badge bg-danger ms-2" style="font-size: 0.65rem;">NEW</span>
                                    @endif
                                </div>
                                <div class="notification-message">
                                    {{ $notif->message }}
                                </div>
                                <div class="notification-time">
                                    <i class="far fa-clock me-1"></i>
                                    {{ $notif->created_at->diffForHumans() }}
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="notification-actions">
                                @if(!$notif->is_read)
                                    <form action="{{ route('notifications.read', $notif->id) }}"
                                          method="POST"
                                          onclick="event.stopPropagation()">
                                        @csrf
                                        <button type="submit"
                                                class="btn-icon btn btn-primary btn-sm"
                                                title="Tandai dibaca">
                                            <i class="fas fa-check"></i>
                                        </button>
                                    </form>
                                @endif

                                <form action="{{ route('notifications.destroy', $notif->id) }}"
                                      method="POST"
                                      onclick="event.stopPropagation()"
                                      onsubmit="return confirm('Hapus notifikasi ini?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit"
                                            class="btn-icon btn btn-danger btn-sm"
                                            title="Hapus">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="empty-state">
                        <i class="fas fa-bell-slash"></i>
                        <h4 class="text-muted">Belum Ada Notifikasi</h4>
                        <p class="text-muted">Notifikasi Anda akan muncul di sini</p>
                    </div>
                @endforelse

                <!-- Pagination -->
                @if($notifications->hasPages())
                    <div class="d-flex justify-content-center mt-4">
                        {{ $notifications->links() }}
                    </div>
                @endif
            </div>

            <!-- Tab: Belum Dibaca -->
            <div class="tab-pane fade" id="belum-dibaca">
                @php
                    $unreadNotifs = $notifications->where('is_read', false);
                @endphp

                @forelse($unreadNotifs as $notif)
                    <div class="notification-card unread"
                         onclick="window.location='{{ route('notifications.read', $notif->id) }}'">
                        <div class="d-flex align-items-start">
                            <div class="notification-icon {{ $notif->color }}">
                                <i class="{{ $notif->icon }}"></i>
                            </div>
                            <div class="notification-content">
                                <div class="notification-title">
                                    {{ $notif->title }}
                                    <span class="badge bg-danger ms-2" style="font-size: 0.65rem;">NEW</span>
                                </div>
                                <div class="notification-message">
                                    {{ $notif->message }}
                                </div>
                                <div class="notification-time">
                                    <i class="far fa-clock me-1"></i>
                                    {{ $notif->created_at->diffForHumans() }}
                                </div>
                            </div>
                            <div class="notification-actions">
                                <form action="{{ route('notifications.read', $notif->id) }}"
                                      method="POST"
                                      onclick="event.stopPropagation()">
                                    @csrf
                                    <button type="submit"
                                            class="btn-icon btn btn-primary btn-sm"
                                            title="Tandai dibaca">
                                        <i class="fas fa-check"></i>
                                    </button>
                                </form>

                                <form action="{{ route('notifications.destroy', $notif->id) }}"
                                      method="POST"
                                      onclick="event.stopPropagation()"
                                      onsubmit="return confirm('Hapus notifikasi ini?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit"
                                            class="btn-icon btn btn-danger btn-sm"
                                            title="Hapus">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="empty-state">
                        <i class="fas fa-check-circle"></i>
                        <h4 class="text-muted">Semua Sudah Dibaca!</h4>
                        <p class="text-muted">Tidak ada notifikasi yang belum dibaca</p>
                    </div>
                @endforelse
            </div>

            <!-- Tab: Sudah Dibaca -->
            <div class="tab-pane fade" id="sudah-dibaca">
                @php
                    $readNotifs = $notifications->where('is_read', true);
                @endphp

                @forelse($readNotifs as $notif)
                    <div class="notification-card read"
                         onclick="window.location='{{ $notif->url ?? '#' }}'">
                        <div class="d-flex align-items-start">
                            <div class="notification-icon {{ $notif->color }}">
                                <i class="{{ $notif->icon }}"></i>
                            </div>
                            <div class="notification-content">
                                <div class="notification-title">
                                    {{ $notif->title }}
                                </div>
                                <div class="notification-message">
                                    {{ $notif->message }}
                                </div>
                                <div class="notification-time">
                                    <i class="far fa-clock me-1"></i>
                                    {{ $notif->created_at->diffForHumans() }}
                                </div>
                            </div>
                            <div class="notification-actions">
                                <form action="{{ route('notifications.destroy', $notif->id) }}"
                                      method="POST"
                                      onclick="event.stopPropagation()"
                                      onsubmit="return confirm('Hapus notifikasi ini?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit"
                                            class="btn-icon btn btn-danger btn-sm"
                                            title="Hapus">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <h4 class="text-muted">Belum Ada yang Dibaca</h4>
                        <p class="text-muted">Notifikasi yang sudah dibaca akan muncul di sini</p>
                    </div>
                @endforelse
            </div>

        </div>

    </div>
</div>

<!-- Alert Notifikasi -->
@if(session('success'))
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: '{{ session("success") }}',
                confirmButtonColor: '#ffb703',
                timer: 2000,
                showConfirmButton: false
            });
        });
    </script>
@endif

@endsection
