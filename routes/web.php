<?php

use App\Http\Controllers\Frontend\ContentManagementController;
use App\Http\Controllers\Frontend\HomeController;
use App\Models\AmericanBathGroupProductFound;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/userlogin', [HomeController::class, 'login'])->name('login');

Route::fallback(fn () => Inertia::render('NotFound'));

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
        $product = AmericanBathGroupProductFound::whereHas('avg_ranks')->where('website_sku', '1000666763')->first();
        if ($product) {
            // dd($product?->avg_ranks[0]->categoryinfo);
            dd($product?->avg_ranks->categoryinfo->website_category_name);
        }

    })->name('test');
});

require __DIR__.'/auth.php';
