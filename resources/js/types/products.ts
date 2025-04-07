export interface Product {
    id: number;
    user_id: number;
    website_id: number;
    product_sku: string;
    website_sku: string;
    variations: string;
    variation_on_pdp: string;
    variation_count: number;
    client_sku_pdp: string;
    product_name: string;
    product_word_count: number;
    product_description: string;
    product_featchers: string;
    attribute_text: string;
    inventory: string;
    prime: string; // 'Y' | 'N'
    romance_copy: string;
    romance_copy_char_count: number;
    romance_copy_word_count: number;
    character_count: number;
    brand: string;
    brand_in_desc: string; // 'YES' | 'NO'
    brand_in_name: number; // 0 or 1
    desc_word_count: number;
    desc_char_count: number;
    richtext: number;
    product_url: string;
    price: number;
    base_cost: number;
    mark_down_price: number;
    in_stock: string; // 'Y' | 'N'
    add_to_cart: boolean;
    stock_level: number;
    images: number;
    high_res_images: number;
    videos: number;
    attribute: number;
    question: number;
    bullet: number;
    bullet_words: number;
    bullet_word_range: string;
    bullet_char: number;
    bulletavg: number;
    reviews: number;
    rating: number;
    ship_start: string;
    fast_delivery: boolean;
    quick_ship: string;
    product_sellers: string;
    amazon_bsr: string;
    amazon_buybox_seller: string;
    sales_banner: string;
    you_might_also_need: string;
    image_name: string;
    break_status: number;
    break_reason: string;
    skus_pdp_page: string;
    all_seller: string;
    zip_code_city: string;
    created: string; // Use `Date` if you parse it as a real date
    modified: string; // Use `Date` if parsed from timestamp
  }