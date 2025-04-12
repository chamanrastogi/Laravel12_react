export interface PriceEntry  { lp: string; dp: number };
export interface PriceData  { [date: string]: PriceEntry };

export interface ApiProductPriceRecord  {
    crawler_id: string | undefined;
    product_sku: string | undefined;
    website_sku: string | undefined;
    variations: string| undefined;
    seller: string| undefined;
    product_price: string | undefined;
    product_name: string| undefined;
    product_url: string| undefined;
    created: string| undefined;
    price_data: string |undefined; // JSON string
};

export interface ProductPriceRecordParsed extends Omit<ApiProductPriceRecord, 'price_data'> {
    price_data: PriceData;
  }
export interface ApiResponse  {
    total: number;
    data: ApiProductPriceRecord[];
    current_page: number;
    per_page: number;
    last_page: number;
    from: number;
    to: number;
    total_records: number;
};

export interface LazyParams {
    first: number;
    rows: number;
    page: number;
};