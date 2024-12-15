export interface Product{
    id:number
    name: string
    scent: string
    isBestSeller: boolean
    imageUrl: string
    stock: number,
    highestPrice: number
    lowestPrice: number
    highestPriceAfterDiscount:number
    lowestPriceAfterDiscount: number
    categoryName: string
    categoryId: number
}