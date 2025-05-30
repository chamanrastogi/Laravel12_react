<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

use App\Models\AmericanBathGroupProductFound;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
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
            'website_id',
            'product_sku',
            'website_sku',
            'brand',
            'product_name',
            'created as original_date_found',
            'price',
            'mark_down_price as previous_price',
            'high_res_images as high_res_image_count',
            'images as image_count',
            'videos as video_count',
            'reviews as review_rating',
            'rating as avg_review_rating',
            'in_stock',
            'prime',
        ]);
        $query->where('website_id', $request->websiteId);
        // Sorting
        if ($request->filled('in_stock')) {
            if ($request->in_stock == 3 || $request->in_stock == '') {
               
            }else
            {
                 $query->where('in_stock', $request->in_stock); 
            }
        }
        if ($request->filled('sortField') && $request->filled('sortOrder')) {
            $sortOrder = $request->sortOrder == 1 ? 'asc' : 'desc';
            $query->orderBy($request->sortField, $sortOrder);
        }

        // Filtering
        if ($request->filled('filters')) {
            $filters = json_decode($request->filters, true);

            foreach ($filters as $field => $filter) {
                $value = Arr::get($filter, 'value');
                $matchMode = Arr::get($filter, 'matchMode', 'contains');

                if ($value !== null && $value !== '') {
                    switch ($matchMode) {
                        case 'contains':
                            $query->where($field, 'LIKE', "%$value%");
                            break;
                        case 'equals':
                            $query->where($field, '=', $value);
                            break;
                        case 'startsWith':
                            $query->where($field, 'LIKE', "$value%");
                            break;
                        case 'endsWith':
                            $query->where($field, 'LIKE', "%$value");
                            break;
                        case 'notContains':
                            $query->where($field, 'NOT LIKE', "%$value%");
                            break;
                        case 'notEquals':
                            $query->where($field, '!=', $value);
                            break;
                        case 'lt':
                            $query->where($field, '<', $value);
                            break;
                        case 'gt':
                            $query->where($field, '>', $value);
                            break;
                    }
                }
            }
        }

        // Search
        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('product_name', 'LIKE', "%$searchTerm%")
                    ->orWhere('product_sku', 'LIKE', "%$searchTerm%")
                    ->orWhere('website_sku', 'LIKE', "%$searchTerm%");
            });
        }

        // Get rows per page from request or default to 10
        $perPage = $request->filled('rows') ? $request->rows : 100;

        // Paginate results
        $paginatedResults = $query->with([
            'website_category:product_tracker_website_id,website_category_name',
            'avg_ranks'

        ])->paginate($perPage);

        return response()->json([
            'data' => $paginatedResults->items(),
            'total' => $paginatedResults->total(),
            'current_page' => $paginatedResults->currentPage(),
            'per_page' => $paginatedResults->perPage(),
            'last_page' => $paginatedResults->lastPage(),
            'filters' => $filters ?? []
        ]);
    }

    public function ajaxProductsMargin(Request $request)
    {
        try {
            set_time_limit(120);
            ini_set('memory_limit', '1024M');
            $user_id = 1178;
            $website_id = 4;
            $api_name = 'price_data_tab';
            $filters = '[]';
            $filename = $website_id . "_" . $user_id . "_" . $api_name . ".json";
            $url = "http://169.44.165.21/CMAPI/DataController.php?user_id=1178&website_id=4&api_name=price_data_tab&filters=[]";

            if (Storage::exists($filename) && $request->active == "true") {
                Storage::delete($filename);
            }
            // If file doesn't exist, fetch and store it
            if (!Storage::exists($filename)) {
                $response = Http::timeout(100)
                    ->connectTimeout(10)
                    ->get($url);

                if (!$response->successful()) {
                    return response()->json(['message' => 'Failed to fetch data'], $response->status());
                }

                $todos = $response->json();
                Storage::put($filename, json_encode($todos));
                Log::info("File generated: " . $filename);
            }

            // Load data from file     
            if (Storage::exists($filename)) {
                $fileContents = Storage::get($filename);
                $todos = json_decode($fileContents, true);

                // Get pagination and search parameters
                $page = $request->input('page', 1);
                $perPage = $request->input('per_page', 10);
                $searchTerm = $request->input('search', '');

                // Apply search filter if search term exists
                if (!empty($searchTerm)) {
                    $todos = array_filter($todos, function ($item) use ($searchTerm) {
                        $searchLower = strtolower($searchTerm);
                        return (
                            str_contains(strtolower($item['product_sku'] ?? ''), $searchLower) ||
                            str_contains(strtolower($item['website_sku'] ?? ''), $searchLower) ||
                            str_contains(strtolower($item['seller'] ?? ''), $searchLower)
                        );
                    });
                }

                // Calculate pagination
                $total = count($todos);
                $offset = ($page - 1) * $perPage;
                $paginatedData = array_slice($todos, $offset, $perPage);

                return response()->json([
                    'data' => $paginatedData,
                    'total' => $total,
                    'current_page' => (int)$page,
                    'per_page' => (int)$perPage,
                    'last_page' => ceil($total / $perPage),
                    'from' => $offset + 1,
                    'to' => min($offset + $perPage, $total),
                    'total_records' => $total
                ]);
            } else {
                return response()->json(['error' => 'File not found.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function ajaxOverviewDataTab(Request $request)
    {

        try {
            set_time_limit(120);
            ini_set('memory_limit', '1024M');
            $user_id = 1178;
            $website_id = 4;
            $api_name = 'overview_data_tab';
            $filename = $website_id . "_" . $user_id . "_" . $api_name . ".json";
            $url  = 'http://169.44.165.21/CMAPI/DataController.php';
            // Build URL with proper parameters
            $params = [
                'user_id'     => $user_id,
                'website_id'  => $website_id,
                'api_name'    => $api_name,
                'filters'     => json_encode([
                    'crawler_id'   => '4',
                    'product_sku'  => ['$ne' => ''],
                    'seller'       => ['$nin' => ['Seller_not_captured', '']],
                ]),
            ];
            if (Storage::exists($filename) && $request->active == "true") {
                Storage::delete($filename);
            }
            // If file doesn't exist or is older than 1 hour, fetch and store it
            if (!Storage::exists($filename) || (time() - Storage::lastModified($filename)) > 3600) {
                $response = Http::timeout(100)
                    ->connectTimeout(10)
                    ->get($url, $params);

                if (!$response->successful()) {
                    return response()->json(['message' => 'Failed to fetch data'], $response->status());
                }

                $todos = $response->json();
                Storage::put($filename, json_encode($todos));
                Log::info("File generated: " . $filename);
            }

            // Load data from file     
            if (Storage::exists($filename)) {
                $fileContents = Storage::get($filename);
                $todos = json_decode($fileContents, true);

                // Get pagination and search parameters
                $page = $request->input('page', 1);
                $perPage = $request->input('per_page', 10);
                $searchTerm = $request->input('search', '');

                // Apply search filter if search term exists
                if (!empty($searchTerm)) {
                    $todos = array_filter($todos, function ($item) use ($searchTerm) {
                        $searchLower = strtolower($searchTerm);
                        return (
                            str_contains(strtolower($item['product_sku'] ?? ''), $searchLower) ||
                            str_contains(strtolower($item['website_sku'] ?? ''), $searchLower) ||
                            str_contains(strtolower($item['seller'] ?? ''), $searchLower)
                        );
                    });
                }

                // Calculate pagination
                $total = count($todos);
                $offset = ($page - 1) * $perPage;
                $paginatedData = array_slice($todos, $offset, $perPage);

                return response()->json([
                    'data' => $paginatedData,
                    'total' => $total,
                    'current_page' => (int)$page,
                    'per_page' => (int)$perPage,
                    'last_page' => ceil($total / $perPage),
                    'from' => $offset + 1,
                    'to' => min($offset + $perPage, $total),
                    'total_records' => $total
                ]);
            } else {
                return response()->json(['error' => 'File not found.'], 404);
            }
        } catch (\Exception $e) {
            Log::error('Error in ajaxOverviewDataTab: ' . $e->getMessage());
            return response()->json([
                'error' => true,
                'message' => 'An error occurred while processing your request.'
            ], 500);
        }
    }
}
