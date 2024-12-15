import { Product } from "./product"

export interface Paging{
    PageIndex:number
    PageSize:number
    data:Product[]
    totalCount:number
}