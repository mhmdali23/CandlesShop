export interface ProductVariant {
    id: number;
    barcode:number
    weight: number;
    price: number;
    priceAfterDiscount: number;
    stockQuantity: number;
  }
export interface ProductVariantDash {
    barcode:number
    weight: number;
    price: number;
    stockQuantity: number;
  }