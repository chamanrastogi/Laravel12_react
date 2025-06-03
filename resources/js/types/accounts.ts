export interface AccountProps {
    webId: string;
    webName: string;
    active_state:string;
    target:string;
    crawler_date_text:string |Date;
    // ...other props
}

export interface WebsiteCategory {
    website_category_name: string;
}
export interface AvgRansk {
    days: string;
    month_1_avg: string;
}
export interface Product {
    id: number;
    product_sku: string;
    website_sku: string;
    website_category?: WebsiteCategory; // Optional relationship
    avg_ranks?: AvgRansk;
    days_appearing: string;
    average_rank: string;
    product_name: string;
    original_date_found: string;
    brand: string;
    price: number;
    previous_price: number;
    image_count: number;
    high_res_image_count: number;
    video_count: number;
    review_rating: number;
    avg_review_rating: number;
    in_stock: string;
    avg_ship: string;
    prime: boolean;
}
