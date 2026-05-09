<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;

class NotificationApiController extends Controller
{
    // ✅ LIST NOTIFIKASI
    public function index()
    {
        $notifications = Notification::where(
                'user_id',
                Auth::id()
            )
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $unreadCount = Notification::where(
                'user_id',
                Auth::id()
            )
            ->where('is_read', false)
            ->count();

        return response()->json([
            'status' => 'success',
            'unread_count' => $unreadCount,
            'data' => $notifications
        ]);
    }

    // ✅ MARK AS READ
    public function markAsRead(int $id)
    {
        $notification = Notification::where(
                'id',
                $id
            )
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $notification->markAsRead();

        return response()->json([
            'status' => 'success',
            'message' =>
                'Notifikasi sudah dibaca'
        ]);
    }

    // ✅ MARK ALL AS READ
    public function markAllAsRead()
    {
        Notification::where(
                'user_id',
                Auth::id()
            )
            ->where('is_read', false)
            ->update([
                'is_read' => true
            ]);

        return response()->json([
            'status' => 'success',
            'message' =>
                'Semua notifikasi sudah dibaca'
        ]);
    }

    // ✅ DELETE NOTIFICATION
    public function destroy(int $id)
    {
        $notification = Notification::where(
                'id',
                $id
            )
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $notification->delete();

        return response()->json([
            'status' => 'success',
            'message' =>
                'Notifikasi berhasil dihapus'
        ]);
    }

    // ✅ UNREAD COUNT
    public function getUnreadCount()
    {
        $count = Notification::where(
                'user_id',
                Auth::id()
            )
            ->where('is_read', false)
            ->count();

        return response()->json([
            'status' => 'success',
            'count' => $count
        ]);
    }
}