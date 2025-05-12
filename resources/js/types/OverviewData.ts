// Interface for parsed JSON data
export interface PriceEntry {
    lp: string;      // List price
    dp: number;      // Discounted price
    alp_30: number;  // Avg low price (30 days)
    alp_lm: number;  // Avg low price (last month)
    llp: number;     // Lowest list price
    hlp: number;     // Highest list price
    am_30: number;   // Avg market price (30 days)
    lm: number;      // Lowest market price
    hm: number;      // Highest market price
  }
  
  // Interface for a single product price record
  export interface ApiProductPriceRecord {
    crawler_id: string | undefined;
    created: string | undefined;
    json_data: string; // JSON string (will need to parse as PriceEntry)
    product_price: string | undefined;
    product_sku: string | undefined;
    seller: string | undefined;
    website_sku: string | undefined;
  }
  
  // Interface for API response containing multiple records
  export interface ApiResponse {
    total: number;
    data: ApiProductPriceRecord[];
    current_page: number;
    per_page: number;
    last_page: number;
    from: number;
    to: number;
    total_records: number;
  }
  
  // Interface for lazy loading params (pagination)
  export interface LazyParams {
    first: number;
    rows: number;
    page: number;
  }
  