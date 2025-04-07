<?php

namespace App\Http\Controllers;

use App\Models\AmericanBathGroupProductFound;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentManagementController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('frontend/content-management/index');
    }

   

    public function ajaxProducts(Request $request)
    {
        
        $query = AmericanBathGroupProductFound::select([
            'id',
            'product_sku',
            'website_sku',
            'product_name',
            'created as original_date_found',
            'price',
            'mark_down_price as previous_price',
            'inventory as stock_status',
            'images as image_count',
            'videos as video_count',
            'bullet as bullet_points',
            'attribute',
            'rating as avg_review_rating',
            'reviews as review_count',
            'prime',
            'romance_copy',
            'modified as last_updated',
        ]);

        // Optionally add sorting/filtering here...

        return response()->json($query->paginate(10));
    }
}
