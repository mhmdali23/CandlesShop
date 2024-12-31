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
    discountpercentage:number
    benefits:string
    categoryName: string
    categoryId: number
}