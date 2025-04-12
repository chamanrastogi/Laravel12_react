export interface PriceDetails  {
    net: string;
    list: string;
    margin: string;
};

export interface ProductData  {
    productSku: string;
    accountSku: string;
    seller: string;
    condition: string;
    [date: `date_${string}`]: PriceDetails | string;
};