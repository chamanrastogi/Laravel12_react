<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AmericanBathGroupCategoryAvgRanksLatest extends Model
{
    protected $table = 'american_bath_group_category_avg_ranks_latest';

    public function categoryinfo(): BelongsTo
    {
        // return $this->belongsTo(NewProductMasterUrls::class, 'website_id','id') ->withDefault([
        //     'website_category_name' => 'N/A',
        // ]);
        return $this->belongsTo(NewProductMasterUrls::class, 'category');
    }
}
