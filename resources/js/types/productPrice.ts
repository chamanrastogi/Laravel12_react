export interface ProductPriceData  {
    crawler_id: string;
    product_sku: string;
    website_sku: string;
    seller: string;
    product_price: string;
    json_data: {
      dp: number;
      lp: string;
      alp_30: number;
      alp_lm: number;
      llp: string;
      hlp: string;
      am_30: number;
      lm: number;
      hm: number;
    };
    created: string;
  };

  export interface ProductPriceDatas  {
    product_price_data: ProductPriceData[];   
  }
