<?php

use App\Http\Controllers\Frontend\HomeController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Frontend\ContentManagementController;
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


});

require __DIR__ . '/auth.php';
