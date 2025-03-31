<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentManagementController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('frontend/content-management/index');
    }
}
