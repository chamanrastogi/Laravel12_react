
export interface ApiResponse  {
    total: number;
    data: ProductPriceRecord[];
  };
  
export interface PriceEntry {
    lp: string; // List Price
    dp: number; // Discounted Price (or maybe Discount Percentage)
}

export interface PriceData {
    [date: string]: PriceEntry;
}

export interface ProductPriceRecord {
    crawler_id: string;
    product_sku: string;
    website_sku: string;
    variations: string;
    seller: string;
    product_price: string;
    product_name: string;
    product_url: string;
    price_data: string; // Raw JSON string
    created: string;
}

// Optional: parsed version with `price_data` as an object
export interface ProductPriceRecordParsed extends Omit<ProductPriceRecord, 'price_data'> {
    price_data: PriceData;
}
