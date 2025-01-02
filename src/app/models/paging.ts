import { Product, ProductDash } from "./product"

export interface Paging{
    PageIndex:number
    PageSize:number
    data:Product[]
    totalCount:number
}

export interface PagingDash{
    PageIndex:number
    PageSize:number
    data:ProductDash[]
    totalCount:number
}
