<?php

use App\Http\Controllers\Backend\EmployeeController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Backend\SellerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Backend\StudentController;
use App\Http\Controllers\ContentManagementController;
use Inertia\Inertia;

Route::get('/', [HomeController::class,'index'])->name('home');

Route::fallback(fn () => Inertia::render('NotFound'));

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('students', [StudentController::class, 'students'])->name('students');
    Route::get('student', [StudentController::class, 'index'])->name('student.index');
    Route::get('student/create', [StudentController::class, 'create'])->name('student.create');
    Route::post('student/store', [StudentController::class, 'store'])->name('student.store');
    Route::get('student/edit/{student}', [StudentController::class, 'edit'])->name('student.edit');
    Route::put('student/{student}', [StudentController::class, 'update'])->name('student.update');
    Route::get('student/delete/{student}', [StudentController::class, 'destroy'])->name('student.delete');
    Route::resource('sellers', SellerController::class);
    Route::resource('employees', EmployeeController::class);
    Route::get('employees-ajax', [EmployeeController::class,'ajaxPage'])->name('employees.ajax');
    Route::get('sellers-ajax', [SellerController::class, 'ajaxPage'])->name('sellers.ajax');
});
Route::get('test', function () {
    return Inertia::render('test');
})->name('test');
Route::get('table', [EmployeeController::class,'table'])->name('employees.table');
Route::get('example', function () {
    return Inertia::render('example');
})->name('test');

Route::middleware(['auth'])->group(function () {
    Route::get('/top-seller-tracker', function () {
        return Inertia::render('frontend/top-seller-tracker/TopSellerTracker');
    })->name('topsellertracker');
    Route::get('/content-management', [ContentManagementController::class,'index'])->name('content.management');
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
