<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

use App\Models\AmericanBathGroupProductFound;
use App\Models\UserCrawler;
use App\Models\CrawlersName;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\SellerControlledByClient;

class ContentManagementController extends Controller
{
    protected $Crawlers;
    protected $CrawlersDisp;
    protected $website_id;
    protected $target;
    protected $active_state;
    protected $reason;
    protected $user_id;

    // Add all the following properties:
    protected $image_capture_date;
    protected $seller_margin_created_date;
    protected $historical_date;
    protected $FirstMonth;
    protected $SecondMonth;
    protected $crawler_date_text;
    protected $crawler_date_p;
    protected $curr_date;
    protected $username;
    protected $tableuser;
    protected $product_founds;
    protected $multi_target_list;
    protected $wayfair_not_publish;
    protected $highlevel_action_reports_tbl;
    protected $website_level_analysis_tbl;
    protected $website_level_analysis_graph_tbl;
    protected $target_product_founds;
    protected $target_image_checker_product_founds;
    protected $target_saved_image_checker_product_founds;
    protected $crawler_raw_records_mysamm8;
    protected $crawler_raw_records_mysamm8_temp;
    protected $review_cmt_table;
    protected $reviewtable;
    protected $category_avg_ranks;
    protected $category_avg_ranks_monday;
    protected $cm_fixemycontent_category;
    protected $target_products_uploads;
    protected $central_url_repository;
    protected $top_product_graph;
    protected $top_ranking_weekly_graph;
    protected $sku_controls_table;
    protected $attribut_table;
    protected $sell_overview_tbl;
    protected $sell_overview_graph_tbl;
    protected $seller_margin_history_tbl;
    protected $seller_margin_history_tbl_all;
    protected $sellmar_history_graph_tbl;
    protected $sellmar_rankdata_tbl;
    protected $user_dnprice_upload_tbl;
    protected $user_dnprice_upload_tbl_prev;
    protected $stock_histories_table;
    protected $amazon_buybox_sellers_table;
    protected $walmart_buybox_sellers_table;
    protected $dnprice_upload_history_tbl;
    protected $shipping_history;
    protected $shipping_week_history;
    protected $ques_ans_table;
    protected $ques_product_founds;
    protected $unmatched_table;
    protected $mrkt_impact_table;
    protected $mrkt_impact_weekly_table;
    protected $mrkt_impact_monthly_table;
    protected $weekly_mrkt_rank_impct_tbl;
    protected $monthly_mrkt_rank_impct_tbl;
    protected $monthly_mrkt_init_tbl;
    protected $amzn_mrkt_impact_table;
    protected $amzn_mrkt_impact_weekly_table;
    protected $amzn_mrkt_impact_monthly_table;
    protected $amzn_weekly_mrkt_rank_impct_tbl;
    protected $amzn_monthly_mrkt_rank_impct_tbl;
    protected $amzn_monthly_mrkt_init_tbl;
    protected $perigold_mrkt_impact_table;
    protected $perigold_mrkt_impact_weekly_table;
    protected $perigold_mrkt_impact_monthly_table;
    protected $perigold_weekly_mrkt_rank_impct_tbl;
    protected $perigold_monthly_mrkt_rank_impct_tbl;
    protected $perigold_monthly_mrkt_init_tbl;
    protected $only_ranking_prfcdata;
    protected $no_rnk_prmcat = 0;
    protected $clnp_mrkt_plc;
    // Add any other properties you use in this controller...

    public function __construct(Request $request)
    {
        date_default_timezone_set('US/Eastern');

        // Set defaults
        $this->website_id = 4;
        $this->active_state = 0;
        $this->target = 0;
        $this->reason = 'all';

        // User logic
        $user = Auth::user();
        if (!$user) {
            abort(403, 'Unauthorized');
        }
        $this->user_id = ($user->pid && $user->pid != "" && $user->pid != 0) ? $user->pid : $user->id;
        $username = $user->username;
        $multi_target_list = $user->multi_target_list ?? null;

        // Allow for override via request
        if ($request->has('uid') && $request->uid != '') {
            $this->user_id = $request->uid;
            // If you have a parent details method, use it here
            // $parentArr = Custom::get_parent_details($this->user_id);
            // $username = $parentArr['User']['username'];
            // $multi_target_list = $parentArr['User']['multi_target_list'];
        }

        // Date logic
        $date = date('m/d/Y', strtotime("-1 days"));
        $date_tab = date('Y-m-d', strtotime("-1 days"));
        $seller_margin_created_date = date('Y-m-d', strtotime("-1 days"));
        $this->image_capture_date = $date;
        $this->seller_margin_created_date = $seller_margin_created_date;
        $this->historical_date = date("Y-m-d", strtotime("-14 month"));
        $this->FirstMonth = date("F", strtotime("-1 month"));
        $mm = date("Y-m-01", strtotime("-1 month"));
        $prev_month_ts = strtotime($mm . ' -1 month');
        $this->SecondMonth = date("F", $prev_month_ts);
        $this->crawler_date_text = "In Stock, Pricing, Shipping, Image and Active Product Data from crawl completed " . date('m/d/Y');
        $this->crawler_date_p = date('m/d/Y', strtotime("previous tuesday"));
        if (strtolower(date("l")) == 'tuesday') {
            $this->crawler_date_p = date('m/d/Y');
        }
        $this->curr_date = $date_tab;

        // Username/table logic
        $this->username = $username;
        $username = strtolower($username);
        $username = preg_replace("/\s+/is", "_", $username);
        $this->tableuser = preg_replace("/\-/is", "_", $username);
        $this->product_founds = $this->tableuser . "_product_founds";
        $this->multi_target_list = $multi_target_list;

        $this->wayfair_not_publish = $user->wayfair_not_publish ?? null;
        $this->highlevel_action_reports_tbl = $this->tableuser . "_highlevel_action_reports";
        $this->website_level_analysis_tbl = $this->tableuser . "_website_level_analysis";
        $this->website_level_analysis_graph_tbl = $this->tableuser . "_website_level_analysis_graph";
        $this->target_product_founds = $this->tableuser . "_target_products";
        $this->target_image_checker_product_founds = $this->tableuser . "_target_image_checker";
        $this->target_saved_image_checker_product_founds = $this->tableuser . "_target_saved_image_checker";
        $this->crawler_raw_records_mysamm8 = "crawled_raw_records_" . $this->tableuser . "_mysamm_8";
        $this->crawler_raw_records_mysamm8_temp = "crawled_temp_records_" . $this->tableuser . "_mysamm_8";
        $this->review_cmt_table = $this->tableuser . "_review_comments_records";
        $this->reviewtable = $this->tableuser . "_review_records";
        if ($this->user_id == 550) {
            $this->reviewtable = 'sei_review_records_temp';
        }
        $this->category_avg_ranks = $this->tableuser . "_category_avg_ranks_latest";
        $this->category_avg_ranks_monday = $this->tableuser . "_category_avg_ranks_monday";
        if ($this->user_id == 198) {
            $this->cm_fixemycontent_category = 1;
            $this->category_avg_ranks = "hinkley_fr_category_avg_ranks_latest_test";
        }
        $this->target_products_uploads = $this->tableuser . "_target_bestsellers";
        $this->central_url_repository = $this->tableuser . "_central_url_repository";
        $this->top_product_graph = $this->tableuser . "_top_ranking_product_graph";
        $this->top_ranking_weekly_graph = $this->tableuser . "_top_ranking_weekly_graph";
        $this->sku_controls_table = $this->tableuser . "_sku_controls";
        $this->attribut_table = $this->tableuser . "_product_attributes";
        $this->sell_overview_tbl = $this->tableuser . "_sell_overview";
        $this->sell_overview_graph_tbl = $this->tableuser . "_sell_overview_gr";
        $this->seller_margin_history_tbl = $this->tableuser . "_sellmar_history";
        $this->seller_margin_history_tbl_all = $this->tableuser . "_sellmar_historyall";
        $this->sellmar_history_graph_tbl = $this->tableuser . "_sellmar_history_gr";
        $this->sellmar_rankdata_tbl = $this->tableuser . "_sellmar_rankdata";
        $this->user_dnprice_upload_tbl = $this->tableuser . "_dnprice_upload";
        $this->user_dnprice_upload_tbl_prev = $this->tableuser . "_dnprice_upload_prev";
        $this->stock_histories_table = $this->tableuser . "_stock_histories";
        $this->amazon_buybox_sellers_table = $this->tableuser . "_amazon_buybox_sellers";
        $this->walmart_buybox_sellers_table = $this->tableuser . "_walmart_buybox_sellers";
        $this->dnprice_upload_history_tbl = "dnprice_upload_history";
        $this->shipping_history = $this->tableuser . "_shipping_histories";
        $this->shipping_week_history = $this->tableuser . "_week_shipping_histories";
        $this->ques_ans_table = $this->tableuser . "_question_answer_records_temp";
        $this->ques_product_founds = $this->tableuser . "_product_founds";
        $this->unmatched_table = $this->tableuser . "_unmatched_product";
        $this->mrkt_impact_table = $this->tableuser . "_marketing_impact";
        $this->mrkt_impact_weekly_table = $this->tableuser . "_marketing_impact_weekly";
        $this->mrkt_impact_monthly_table = $this->tableuser . "_marketing_impact_monthly";
        $this->weekly_mrkt_rank_impct_tbl = $this->tableuser . "_marketing_rank_impact_weekly";
        $this->monthly_mrkt_rank_impct_tbl = $this->tableuser . "_marketing_rank_impact_monthly";
        $this->monthly_mrkt_init_tbl = $this->tableuser . "_marketing_initiative_monthly";
        $this->amzn_mrkt_impact_table = $this->tableuser . "_amazon_marketing_impact";
        $this->amzn_mrkt_impact_weekly_table = $this->tableuser . "_amazon_marketing_impact_weekly";
        $this->amzn_mrkt_impact_monthly_table = $this->tableuser . "_amazon_marketing_impact_monthly";
        $this->amzn_weekly_mrkt_rank_impct_tbl = $this->tableuser . "_amazon_marketing_rank_impact_weekly";
        $this->amzn_monthly_mrkt_rank_impct_tbl = $this->tableuser . "_amazon_marketing_rank_impact_monthly";
        $this->amzn_monthly_mrkt_init_tbl = $this->tableuser . "_amazon_marketing_initiative_monthly";
        $this->perigold_mrkt_impact_table = $this->tableuser . "_perigold_marketing_impact";
        $this->perigold_mrkt_impact_weekly_table = $this->tableuser . "_perigold_marketing_impact_weekly";
        $this->perigold_mrkt_impact_monthly_table = $this->tableuser . "_perigold_marketing_impact_monthly";
        $this->perigold_weekly_mrkt_rank_impct_tbl = $this->tableuser . "_perigold_marketing_rank_impact_weekly";
        $this->perigold_monthly_mrkt_rank_impct_tbl = $this->tableuser . "_perigold_marketing_rank_impact_monthly";
        $this->perigold_monthly_mrkt_init_tbl = $this->tableuser . "_perigold_marketing_initiative_monthly";
        if ($this->user_id == 550) {
            $this->highlevel_action_reports_tbl = $this->tableuser . "_highlevel_action_reports_dm";
            $this->website_level_analysis_tbl = $this->tableuser . "_website_level_analysis_dm";
            $this->website_level_analysis_graph_tbl = $this->tableuser . "_website_level_analysis_graph_dm";
        }

        // Crawler logic
        $output = UserCrawler::where('user_id', $this->user_id)->pluck('crawler_id');
        if ($output->isNotEmpty()) {
            $this->Crawlers = CrawlersName::whereIn('id', $output)->pluck('website_name', 'id');
            $this->CrawlersDisp = CrawlersName::whereIn('id', $output)->pluck('display_name', 'id');
        } else {
            $defaultIds = [4, 16];
            $this->Crawlers = CrawlersName::whereIn('id', $defaultIds)->pluck('website_name', 'id');
            $this->CrawlersDisp = CrawlersName::whereIn('id', $defaultIds)->pluck('display_name', 'id');
        }
    }

    //
    public function index()
    {
        $data = [
            'crawlersDisp' => $this->CrawlersDisp,
            'website_id' => $this->website_id,
            'active_state' => $this->active_state,
            'target' => $this->target
        ];
        return Inertia::render('frontend/content-management/index', $data);
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
            if ($request->in_stock == 0) {
            } else {
                $instock = $request->in_stock;
                if ($instock == 'N') {
                    $query->where('in_stock', '$instock')->where('break_status', 0);
                } else {
                    $query->whereIn('break_status', [2, 3]);
                }
            }
        }
        if ($request->filled('prfc') && $request->prfc == '1') {
            $prfc = 1;
        }
        $only_ranking = 0;
        if ($request->filled('prfc') && $request->prfc == '2') {
            $only_ranking = 1;
        }
        $this->only_ranking_prfcdata = $only_ranking;
        if ($request->filled('no_rank_primecateg') && $request->input('no_rank_primecateg') == '1') {
            $this->no_rnk_prmcat = 1;
        }
        if ($request->filled('sortField') && $request->filled('sortOrder')) {
            $sortOrder = $request->sortOrder == 1 ? 'asc' : 'desc';
            $query->orderBy($request->sortField, $sortOrder);
        }
        $sellername_list = '';
        $only_seller_disp = 0;

        if (
            $this->clnp_mrkt_plc == '1'
            && in_array($this->website_id, [4, 13, 19])
            && $request->filled('only_seller_disp')
            && $request->input('only_seller_disp') == '1'
        ) {
            $only_seller_disp = 1;
            $sellername = $this->Get_Seller_controlled_by_clients($this->website_id);
            $sellnamarr = array_filter(array_map('trim', explode(',', $sellername)));

            if (!empty($sellnamarr)) {
                $sellername_list = "'" . implode("','", $sellnamarr) . "'";
            }
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

    public function Get_Seller_controlled_by_clients($website_id)
    {
        $user_id = $this->user_id;

        // Fetch all seller_controlled_by_client values for this user and website
        $sellers = UserCrawler::where('user_id', $user_id)
            ->where('website_id', $website_id)
            ->pluck('seller_controlled_by_client')
            ->toArray();

        // Return as a comma-separated string (to match your original logic)
        return implode(',', $sellers);
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
