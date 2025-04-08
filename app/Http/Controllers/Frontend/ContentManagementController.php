<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;

use App\Models\AmericanBathGroupProductFound;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
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
       // dd($request);
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
    
        // Sorting
        if ($request->filled('sortField') && $request->filled('sortOrder')) {
            $sortOrder = $request->sortOrder == 1 ? 'asc' : 'desc';
            $query->orderBy($request->sortField, $sortOrder);
        }
    
        // Filtering
        if ($request->filled('filters')) {
            $filters = json_decode($request->filters, true);
    
            foreach ($filters as $field => $filter) {
                $value = Arr::get($filter, 'value');
                if ($value !== null && $value !== '') {
                    $query->where($field, 'LIKE', "%$value%");
                }
            }
        }

        // Optionally add sorting/filtering here...

        return response()->json($query->paginate(10));
    }
}
