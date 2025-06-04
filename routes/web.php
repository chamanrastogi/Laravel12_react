<?php

use App\Http\Controllers\Frontend\ContentManagementController;
use App\Http\Controllers\Frontend\HomeController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/userlogin', [HomeController::class, 'login'])->name('login');

Route::fallback(fn() => Inertia::render('NotFound'));

Route::middleware(['auth'])->group(function () {
    Route::get('/', [ContentManagementController::class, 'index'])->name('home');
    Route::get('/top-seller-tracker', function () {
        return Inertia::render('frontend/top-seller-tracker/TopSellerTracker');
    })->name('topsellertracker');
    Route::get('/content-management', [ContentManagementController::class, 'index'])->name('content.management');
    Route::get('ajaxProducts', [ContentManagementController::class, 'ajaxProducts'])->name('content.management.products');
    Route::get('ajaxProductsMargin', [ContentManagementController::class, 'ajaxProductsMargin'])->name('content.management.ajaxProductsMargin');
    Route::get('ajaxOverviewDataTab', [ContentManagementController::class, 'ajaxOverviewDataTab'])->name('content.management.ajaxOverviewDataTab');
    Route::get('/test', function () {
        $categoryFounds = DB::connection('db1')
            ->table('american_bath_group_category_avg_ranks_latest')
            ->select('website_sku', 'category', 'days', 'average')           
            ->where('website_id', 4)
            ->where('is_prime', 1)
            ->groupBy('website_sku', 'category', 'days', 'average')            
            ->get()
            ->keyBy('website_sku');

        dd($categoryFounds);
    })->name('test');
});

require __DIR__ . '/auth.php';
