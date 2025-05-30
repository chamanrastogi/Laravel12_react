<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class AmericanBathGroupProductFound extends Model
{
    //

    public function website_category(): BelongsTo
    {
        return $this->belongsTo(NewProductMasterUrls::class, 'website_id', 'product_tracker_website_id')->withDefault([
            'website_category_name' => 'N/A',
        ]);
    }

    public function avg_ranks(): HasOne
    {
        return $this->hasOne(AmericanBathGroupCategoryAvgRanksLatest::class, 'website_sku', 'website_sku')
            ->where('is_prime', 1);
    }

    // public function getinfo(): HasOneThrough
    // {
    //     return $this->hasOneThrough(
    //         AmericanBathGroupCategoryAvgRanksLatest::class, // Target Model
    //         NewProductMasterUrls::class,                    // Intermediate Model
    //         'product_tracker_website_id',                   // Foreign key on Intermediate Model (NewProductMasterUrls)
    //         'website_sku',                                  // Foreign key on Target Model (AmericanBathGroupCategoryAvgRanksLatest)
    //         'website_id',                                   // Local key on Current Model (AmericanBathGroupProductFound)
    //         'website_sku'                                   // Local key on Intermediate Model (NewProductMasterUrls)
    //     )->where('is_prime', 1); // Add any specific conditions
    // }

}
