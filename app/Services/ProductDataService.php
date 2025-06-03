<?php

namespace App\Services;

use App\Models\AmericanBathGroupProductFound;
use App\Models\SellerControlledByClient; // Assuming you have this model
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB; // Keep if Get_Seller_controlled_by_clients uses DB facade

class ProductDataService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Fetches seller names controlled by a client.
     *
     * @return string Comma-separated string of seller names.
     */
    public function getSellerControlledByClients(int $userId, int $websiteId): string
    {
        // Use Eloquent or DB facade as needed.
        // This version uses Eloquent assuming a SellerControlledByClient model exists.
        $seller_names = DB::Connection('db1')->table('seller_controlled_by_clients')
            ->where('user_id', $userId)
            ->where('website_id', $websiteId)
            ->pluck('seller_controlled_by_client') // returns a collection of values
            ->toArray();

        return implode(',', $seller_names);
    }

    /**
     * Fetches and filters product data based on request parameters.
     *
     * @param  int  $userId  The user ID from the controller's context.
     * @param  int  $clnpMrktPlc  The clnp_mrkt_plc value from the controller's context.
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getProducts(Request $request, int $userId, int $clnpMrktPlc, string $category_avg_ranks, int $website_id)
    {
        //dd($category_avg_ranks);
        $filters = [];
        if ($request->filled('filters')) {
            $filters = json_decode($request->filters, true);
        }
        $model = new AmericanBathGroupProductFound();
        $model->setConnection('db1');
        $model->setTable('american_bath_group_product_founds');
        $query = $model;
        // $product = $query->whereHas('avg_ranks')->where('website_sku', 'DLT-1130601')->first();
        // if ($product) {
        //     // dd($product?->avg_ranks[0]->categoryinfo);
        //     dd($product?->avg_ranks->categoryinfo->website_category_name);
        // }

        $query = $query->select([
            'id',
            'website_id',
            'product_sku',
            'break_reason',
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

        // Apply base website filter
        $query->where('website_id', $request->websiteId);

        // Apply in_stock filter
        if ($request->filled('in_stock')) {
            if ($request->in_stock == 'Y') {
                $query->where('in_stock', $request->in_stock)->where('break_status', 0);
            } elseif ($request->in_stock == 'N') { // Assuming 'N' for out of stock
                $query->whereIn('break_status', [2, 3]);
            }
            // If $request->in_stock is 'all' or something else, no filter is applied here.
        }

        // Apply sorting
        if ($request->filled('sortField') && $request->filled('sortOrder')) {
            $sortOrder = $request->sortOrder == 1 ? 'asc' : 'desc';
            $query->orderBy($request->sortField, $sortOrder);
        }

        // Apply seller filter logic (using the service method)
        // Check if 'onlysellerdisplay' exists in filters before accessing it
        $onlySellerDisplayFilter = Arr::get($filters, 'onlysellerdisplay', false);

        if (
            $clnpMrktPlc === 1
            && in_array($request->websiteId, [4, 13, 19])
            && $onlySellerDisplayFilter === true
        ) {
            $sellername = $this->getSellerControlledByClients($userId, $request->websiteId);
            $sellnamarr = array_filter(array_map('trim', explode(',', $sellername)));
            if (! empty($sellnamarr)) {
                // Use the array directly with whereIn
                $query->whereIn('product_sellers', $sellnamarr);
            }
        }



        // Apply other filters from the frontend filters object
        if (! empty($filters)) {
            foreach ($filters as $field => $filter) {
                // Skip the 'onlysellerdisplay' filter as it's handled above
                if ($field === 'onlysellerdisplay') {
                    continue;
                }

                $value = Arr::get($filter, 'value');
                $matchMode = Arr::get($filter, 'matchMode', 'contains');

                // Apply filter only if value is not null or empty string
                if ($value !== null && $value !== '') {
                    switch ($matchMode) {
                        case 'contains':
                            $query->where($field, 'LIKE', "%{$value}%");
                            break;
                        case 'equals':
                            $query->where($field, '=', $value);
                            break;
                        case 'startsWith':
                            $query->where($field, 'LIKE', "{$value}%");
                            break;
                        case 'endsWith':
                            $query->where($field, 'LIKE', "%{$value}");
                            break;
                        case 'notContains':
                            $query->where($field, 'NOT LIKE', "%{$value}%");
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
                        // Add other match modes if needed (e.g., in, between)
                        case 'in':
                            if (is_array($value) && ! empty($value)) {
                                $query->whereIn($field, $value);
                            }
                            break;
                    }
                }
            }
        }

        // Apply search term filter
        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('product_name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('product_sku', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('website_sku', 'LIKE', "%{$searchTerm}%");
            });
        }

        // Get rows per page from request or default
        $perPage = $request->filled('rows') ? $request->rows : 100;

        // Paginate results with relationships
        $paginatedResults = $query->paginate($perPage);

        return $paginatedResults; // Return the paginated collection
    }
}
