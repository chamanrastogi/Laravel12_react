<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductDataService
{
    /**
     * Fetches seller names controlled by a client.
     *
     * @param  int  $userId
     * @param  int  $websiteId
     * @return string Comma-separated string of seller names.
     */
    public function getSellerControlledByClients(int $userId, int $websiteId): string
    {
        return implode(',', DB::connection('db1')->table('seller_controlled_by_clients')
            ->where('user_id', $userId)
            ->where('website_id', $websiteId)
            ->pluck('seller_controlled_by_client')
            ->toArray());
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
        // Fetch products
        $products = $this->getMatchedProducts($request, $website_id);

        // Apply filters
        $filteredProducts = $this->applyFilters($products, $request, $userId, $clnpMrktPlc);

        // Apply sorting
        $sortedProducts = $this->applySorting($filteredProducts, $request);

        // Paginate the results
        $perPage = $request->filled('rows') ? (int)$request->rows : 100;
        $currentPage = $request->get('page', 1);
        $offset = ($currentPage - 1) * $perPage;
        $items = array_slice($sortedProducts, $offset, $perPage);

        return new LengthAwarePaginator(
            $items,
            count($sortedProducts),
            $perPage,
            $currentPage,
            ['path' => $request->url(), 'query' => $request->query()]
        );
    }

    /**
     * Get matched products based on category.
     *
     * @param  Request  $request
     * @param  int  $website_id
     * @return array
     */
    private function getMatchedProducts(Request $request, int $website_id): array
    {
        $categoryFounds = DB::connection('db1')
            ->table('american_bath_group_category_avg_ranks_latest')
            ->select('website_sku', 'category', 'days', 'average')
            ->where('website_id', $request->websiteId)
            ->where('is_prime', 1)
            ->get()
            ->keyBy('website_sku');

        $products = DB::connection('db1')
            ->table('american_bath_group_product_founds')
            ->select([
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
            ])
            ->where('website_id', $request->websiteId)
            ->get()
            ->filter(function ($product) use ($categoryFounds) {
                $website_sku = strtolower($product->website_sku);
                return isset($categoryFounds[$website_sku]);
            })
            ->map(function ($product) use ($categoryFounds) {
                $website_sku = strtolower($product->website_sku);
                $category = DB::connection('db1')
                    ->table('new_product_master_urls')
                    ->select('website_category_name', 'website_url')
                    ->where('id', $categoryFounds[$website_sku]->category)
                    ->first();
                $product->days = $categoryFounds[$website_sku]->days;
                $product->average = $categoryFounds[$website_sku]->average;
                $product->categoryinfo['websiteUrl'] = $category ? $category->website_url : null;
                $product->categoryinfo['categoryName'] = $category ? $category->website_category_name : null;

                return (array)$product;
            })
            ->toArray();

        return $products;
    }

    /**
     * Applies filters to the product data.
     *
     * @param  array  $data
     * @param  Request  $request
     * @param  int  $userId
     * @param  int  $clnpMrktPlc
     * @return array
     */
    private function applyFilters(array $data, Request $request, int $userId, int $clnpMrktPlc): array
    {
        $filters = $request->filled('filters') ? json_decode($request->filters, true) : [];

        $data = array_filter($data, function ($item) use ($request, $filters, $userId, $clnpMrktPlc) {
            // In stock filter
            if ($request->filled('in_stock')) {
                $inStock = $request->in_stock;
                if ($inStock === 'Y' && !($item['in_stock'] === 'Y' && $item['break_reason'] == 0)) {
                    return false;
                } elseif ($inStock === 'N' && !in_array($item['break_reason'], [2, 3])) {
                    return false;
                }
            }

            // Seller filter logic
            if (
                $clnpMrktPlc === 1
                && in_array($request->websiteId, [4, 13, 19])
                && Arr::get($filters, 'onlysellerdisplay', false) === true
            ) {
                $sellerNamesString = $this->getSellerControlledByClients($userId, $request->websiteId);
                $sellerNames = array_filter(array_map('trim', explode(',', $sellerNamesString)));
                if (!empty($sellerNames) && !in_array($item['product_sellers'], $sellerNames)) {
                    return false;
                }
            }

            // Other filters
            foreach ($filters as $field => $filter) {
                if ($field === 'onlysellerdisplay') {
                    continue;
                }

                $value = Arr::get($filter, 'value');
                $matchMode = Arr::get($filter, 'matchMode', 'contains');

                if ($value !== null && $value !== '') {
                    $itemValue = Arr::get($item, $field);
                    if ($itemValue === null) {
                        return false;
                    }

                    switch ($matchMode) {
                        case 'contains':
                            if (strpos($itemValue, $value) === false) return false;
                            break;
                        case 'equals':
                            if ($itemValue != $value) return false;
                            break;
                        case 'startsWith':
                            if (strpos($itemValue, $value) !== 0) return false;
                            break;
                        case 'endsWith':
                            if (substr($itemValue, -strlen($value)) !== $value) return false;
                            break;
                        case 'notContains':
                            if (strpos($itemValue, $value) !== false) return false;
                            break;
                        case 'notEquals':
                            if ($itemValue != $value) return false;
                            break;
                        case 'lt':
                            if ($itemValue >= $value) return false;
                            break;
                        case 'gt':
                            if ($itemValue <= $value) return false;
                            break;
                        case 'in':
                            if (!is_array($value) || empty($value) || !in_array($itemValue, $value)) return false;
                            break;
                        default:
                            break;
                    }
                }
            }

            // Search filter
            if ($request->filled('search')) {
                $searchTerm = $request->search;
                if (
                    strpos($item['product_name'], $searchTerm) === false &&
                    strpos($item['product_sku'], $searchTerm) === false &&
                    strpos($item['website_sku'], $searchTerm) === false
                ) {
                    return false;
                }
            }

            return true;
        });

        return $data;
    }

    /**
     * Applies sorting to the product data.
     *
     * @param  array  $data
     * @param  Request  $request
     * @return array
     */
    private function applySorting(array $data, Request $request): array
    {
        if ($request->filled('sortField') && $request->filled('sortOrder')) {
            $sortField = $request->sortField;
            $sortOrder = $request->sortOrder == 1 ? 'asc' : 'desc';

            usort($data, function ($a, $b) use ($sortField, $sortOrder) {
                $aValue = Arr::get($a, $sortField);
                $bValue = Arr::get($b, $sortField);

                if ($aValue == $bValue) {
                    return 0;
                }

                return ($sortOrder === 'asc') ? ($aValue <=> $bValue) : ($bValue <=> $aValue);
            });
        }

        return $data;
    }
}
