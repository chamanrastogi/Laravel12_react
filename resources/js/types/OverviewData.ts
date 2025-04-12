export interface PriceEntry  { lp: string; dp: number };
export interface PriceData  { [date: string]: PriceEntry };

export interface ApiProductPriceRecord  {
    crawler_id: string | undefined;
    created: string| undefined;
    json_data: string |undefined; // JSON string
    product_price: string | undefined;
    product_sku: string | undefined;
    seller: string| undefined;
    website_sku: string | undefined;
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
    visit: boolean;
};

export interface LazyParams {
    first: number;
    rows: number;
    page: number;
};
