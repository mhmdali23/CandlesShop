import { ProductVariant, ProductVariantDash } from "./productVariant"

export interface Product{
    id:number
    name: string
    scent: string
    isBestSeller: boolean
    description:string
    features:string
    calltoaction:string
    imageUrl: string
    highestPrice: number
    lowestPrice: number
    isDailyOffer:boolean
    highestPriceAfterDiscount:number
    lowestPriceAfterDiscount: number
    discountPercentage:number
    benefits:string
    categoryName: string
    categoryId: number
    variants:ProductVariant[]
}
export interface ProductDash{
    id:number
    name: string
    scent: string
    isBestSeller: boolean
    description:string
    features:string
    calltoAction:string
    imageUrl: string
    highestPrice: number
    lowestPrice: number
    isDailyOffer:boolean
    highestPriceAfterDiscount:number
    lowestPriceAfterDiscount: number
    discountPercentage:number
    benfits:string
    categoryName: string
    categoryId: number
    variants:ProductVariantDash[]
}