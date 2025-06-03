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
        NewProductMasterUrls::class,                          // Target Model
        AmericanBathGroupCategoryAvgRanksLatest::class,      // Intermediate Model
        'website_sku',                                        // Foreign key on Intermediate (AmericanBathGroupCategoryAvgRanksLatest.website_sku)
        'id',                                                 // Foreign key on Target (NewProductMasterUrls.id)
        'website_sku',                                        // Local key on Current (AmericanBathGroupProductFound.website_sku)
        'category'                                            // Local key on Intermediate (AmericanBathGroupCategoryAvgRanksLatest.category)
    )
    ->where('american_bath_group_category_avg_ranks_latest.is_prime', 1)
    ->select('new_product_master_urls.website_category_name as website_category_name'); // Explicitly select from the target table
}

}
