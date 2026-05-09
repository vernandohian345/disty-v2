<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pelatihan;
use App\Models\Sertifikasi;
use App\Models\TransaksiPelatihan;
use App\Models\TransaksiSertifikasi;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Statistics
        $stats = [
            'total_pelatihan' => Pelatihan::count(),
            'total_sertifikasi' => Sertifikasi::count(),
            'total_peserta_pelatihan' => TransaksiPelatihan::where('status', 'approved')->count(),
            'total_peserta_sertifikasi' => TransaksiSertifikasi::where('status', 'approved')->count(),
            'pembayaran_pending' => TransaksiPelatihan::where('status', 'pending')->count() +
                                   TransaksiSertifikasi::where('status', 'pending')->count(),
            'sertifikat_belum_generate' => TransaksiPelatihan::where('status', 'approved')
                                          ->whereNull('sertifikat_pelatihan')->count() +
                                          TransaksiSertifikasi::where('status', 'approved')
                                          ->whereNull('sertifikat_internal')->count(),
            'total_users' => User::where('role', 'user')->count(),
        ];

        // Chart Data - 6 bulan terakhir
        $chartData = $this->getChartData();

        // Top Pelatihan
        $topPelatihan = Pelatihan::withCount(['transaksiPelatihan' => function($query) {
            $query->where('status', 'approved');
        }])
        ->orderBy('transaksi_pelatihan_count', 'desc')
        ->limit(5)
        ->get();

        // Top Sertifikasi
        $topSertifikasi = Sertifikasi::withCount(['transaksiSertifikasi' => function($query) {
            $query->where('status', 'approved');
        }])
        ->orderBy('transaksi_sertifikasi_count', 'desc')
        ->limit(5)
        ->get();

        // Recent Pembayaran (gabungan pelatihan & sertifikasi)
        $recentPembayaran = $this->getRecentPembayaran();

        // Recent Sertifikat (yang baru di-generate)
        $recentSertifikat = $this->getRecentSertifikat();

        return view('admin.dashboard', compact(
            'stats',
            'chartData',
            'topPelatihan',
            'topSertifikasi',
            'recentPembayaran',
            'recentSertifikat'
        ));
    }

    private function getChartData()
    {
        $months = [];
        $pelatihanData = [];
        $sertifikasiData = [];

        // 6 bulan terakhir
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $months[] = $month->translatedFormat('M Y');

            // Count pelatihan per bulan
            $pelatihanCount = TransaksiPelatihan::whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->where('status', 'approved')
                ->count();
            $pelatihanData[] = $pelatihanCount;

            // Count sertifikasi per bulan
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
        // Gabungkan transaksi pelatihan dan sertifikasi
        $pelatihan = TransaksiPelatihan::with('pelatihan')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $sertifikasi = TransaksiSertifikasi::with('sertifikasi')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Merge dan sort by created_at
        $merged = $pelatihan->merge($sertifikasi)
            ->sortByDesc('created_at')
            ->take(5);

        return $merged;
    }

    private function getRecentSertifikat()
    {
        // Pelatihan yang sudah ada sertifikat
        $pelatihan = TransaksiPelatihan::with('pelatihan')
            ->where('status', 'approved')
            ->whereNotNull('sertifikat_pelatihan')
            ->orderBy('updated_at', 'desc')
            ->limit(5)
            ->get();

        // Sertifikasi yang sudah ada sertifikat internal
        $sertifikasi = TransaksiSertifikasi::with('sertifikasi')
            ->where('status', 'approved')
            ->whereNotNull('sertifikat_internal')
            ->orderBy('updated_at', 'desc')
            ->limit(5)
            ->get();

        // Merge dan sort by updated_at
        $merged = $pelatihan->merge($sertifikasi)
            ->sortByDesc('updated_at')
            ->take(5);

        return $merged;
    }
}
