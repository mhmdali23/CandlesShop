import { ProductVariant } from "./productVariant";

export interface ProductDetails {
    id: number;
    name: string;
    description: string;
    features: string;
    benfits: string;
    calltoAction: string;
    scent: string;
    imageUrl: string;
    isDailyOffer: boolean,
    productVariants: ProductVariant[];
    categoryName: string;
  }