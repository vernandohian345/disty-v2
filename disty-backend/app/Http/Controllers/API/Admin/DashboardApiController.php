<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pelatihan;
use App\Models\Sertifikasi;
use App\Models\TransaksiPelatihan;
use App\Models\TransaksiSertifikasi;
use App\Models\User;
use App\Models\Blog;
use Carbon\Carbon;

class DashboardApiController extends Controller
{
    public function index()
    {
        // Statistics
        $stats = [
            'total_pelatihan' => Pelatihan::count(),

            'total_sertifikasi' => Sertifikasi::count(),

            'total_blog' => Blog::count(),

            'total_peserta_pelatihan' =>
            TransaksiPelatihan::where('status', 'approved')->count(),

            'total_peserta_sertifikasi' =>
            TransaksiSertifikasi::where('status', 'approved')->count(),

            'pembayaran_pending' =>
            TransaksiPelatihan::where('status', 'pending')->count()
                +
                TransaksiSertifikasi::where('status', 'pending')->count(),

            'sertifikat_belum_generate' =>
            TransaksiPelatihan::where('status', 'approved')
                ->whereNull('sertifikat_pelatihan')
                ->count()
                +
                TransaksiSertifikasi::where('status', 'approved')
                ->whereNull('sertifikat_internal')
                ->count(),

            'total_users' =>
            User::where('role', 'user')->count(),
        ];

        // chart
        $chartData = $this->getChartData();

        // top pelatihan
        $topPelatihan = Pelatihan::withCount([
            'transaksi' => function ($query) {
                $query->where('status', 'approved');
            }
        ])
            ->orderBy('transaksi_count', 'desc')
            ->limit(5)
            ->get();

        // top sertifikasi
        $topSertifikasi = Sertifikasi::withCount([
            'transaksiSertifikasi' => function ($query) {
                $query->where('status', 'approved');
            }
        ])
            ->orderBy('transaksi_sertifikasi_count', 'desc')
            ->limit(5)
            ->get();

        // pembayaran terbaru
        $recentPembayaran = $this->getRecentPembayaran();

        // sertifikat terbaru
        $recentSertifikat = $this->getRecentSertifikat();

        return response()->json([
            'status' => 'success',

            'stats' => $stats,

            'chartData' => $chartData,

            'topPelatihan' => $topPelatihan,

            'topSertifikasi' => $topSertifikasi,

            'recentPembayaran' => $recentPembayaran,

            'recentSertifikat' => $recentSertifikat,

            'scheduleEvents' => $this->getScheduleEvents(),
        ]);
    }

    private function getChartData()
    {
        $months = [];
        $pelatihanData = [];
        $sertifikasiData = [];

        for ($i = 5; $i >= 0; $i--) {

            $month = Carbon::now()->subMonths($i);

            $months[] = $month->translatedFormat('M Y');

            $pelatihanCount = TransaksiPelatihan::whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->where('status', 'approved')
                ->count();

            $pelatihanData[] = $pelatihanCount;

            $sertifikasiCount = TransaksiSertifikasi::whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->where('status', 'approved')
                ->count();

            $sertifikasiData[] = $sertifikasiCount;
        }

        return [
            'labels' => $months,
            'pelatihan' => $pelatihanData,
            'sertifikasi' => $sertifikasiData,
        ];
    }

    private function getRecentPembayaran()
    {
        $pelatihan = TransaksiPelatihan::with('pelatihan')
            ->latest()
            ->limit(5)
            ->get();

        $sertifikasi = TransaksiSertifikasi::with('sertifikasi')
            ->latest()
            ->limit(5)
            ->get();

        return $pelatihan
            ->merge($sertifikasi)
            ->sortByDesc('created_at')
            ->take(5)
            ->values();
    }

    private function getRecentSertifikat()
    {
        $pelatihan = TransaksiPelatihan::with('pelatihan')
            ->where('status', 'approved')
            ->whereNotNull('sertifikat_pelatihan')
            ->latest()
            ->limit(5)
            ->get();

        $sertifikasi = TransaksiSertifikasi::with('sertifikasi')
            ->where('status', 'approved')
            ->whereNotNull('sertifikat_internal')
            ->latest()
            ->limit(5)
            ->get();

        return $pelatihan
            ->merge($sertifikasi)
            ->sortByDesc('updated_at')
            ->take(5)
            ->values();
    }

    private function getScheduleEvents()
    {
        $events = [];

        // pelatihan
        $pelatihans = Pelatihan::all();

        foreach ($pelatihans as $pelatihan) {

            $events[] = [
                'title' =>  $pelatihan->title,

                'start' => $pelatihan->tanggal_pelatihan,

                'backgroundColor' => '#f97316',

                'borderColor' => '#f97316',
            ];
        }

        // sertifikasi
        $sertifikasis = Sertifikasi::all();

        foreach ($sertifikasis as $sertifikasi) {

            $events[] = [
                'title' =>  $sertifikasi->nama_sertifikasi,

                'start' => $sertifikasi->tanggal_sertifikasi,

                'backgroundColor' => '#2563eb',

                'borderColor' => '#2563eb',
            ];
        }

        return $events;
    }
}
