<?php

use App\Http\Controllers\Frontend\ContentManagementController;
use App\Http\Controllers\Frontend\HomeController;
use App\Models\AmericanBathGroupProductFound;
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
        try {
            // Query with relationship existence check
            $product = AmericanBathGroupProductFound::on('db1')
                    ->whereHas('getinfo', function ($query) {
                        $query->where('is_prime', 1);
                    })
                ->where('website_sku', 'B07JFMR3FR')
                ->first();

            if (!$product) {
                return response()->json(['error' => 'Product not found'], 404);
            }

            // Access the category info through the relationship
            $categoryInfo = $product->getinfo;
            
            dd([
                'product' => $product->toArray(),
                'category_info' => $categoryInfo
            ]);

        } catch (\Exception $e) {
            report($e);
            return response()->json([
                'error' => 'Server error',
                'message' => $e->getMessage()
            ], 500);
        }
    })->name('test');
});

require __DIR__ . '/auth.php';
