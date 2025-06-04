<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class AmericanBathGroupProductFound extends Model
{
    protected $table = 'american_bath_group_product_founds';

    // Set the connection name (optional, only if not default)
    protected $connection = 'mysql'; // Or 'db1', 'project_1', etc.

    public function website_category(): BelongsTo
    {
        return $this->belongsTo(NewProductMasterUrls::class, 'website_id', 'product_tracker_website_id')->withDefault([
            'website_category_name' => 'N/A',
        ]);
    }


    public function prime_ranks(): HasMany
    {
        return $this->hasMany(AmericanBathGroupCategoryAvgRanksLatest::class, 'website_sku', 'website_sku')
            ->where('is_prime', 1);
    }
    public function getinfo(): HasOneThrough
    {
        return $this->hasOneThrough(
            NewProductMasterUrls::class,
            AmericanBathGroupCategoryAvgRanksLatest::class,
            'website_sku', // FK on intermediate
            'id',          // FK on target
            'website_sku', // local key on current
            'category'     // local key on intermediate
        )
            ->where('american_bath_group_category_avg_ranks_latest.is_prime', 1)
            ->select(
                'new_product_master_urls.id',
                'new_product_master_urls.website_category_name as website_category_name'
            );
    }
}
