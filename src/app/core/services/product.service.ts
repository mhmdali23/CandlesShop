import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductParams } from '../../models/productParams';
import { Paging, PagingDash } from '../../models/paging';
import { Product } from '../../models/product';
import { ProductDetails } from '../../models/productDetails';
import { UpdateProduct } from '../../models/updateProduct';
import { ProductVariant, ProductVariantDash } from '../../models/productVariant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = "https://localhost:7012/api/Product"
  private scentUrl = "https://localhost:7012/api/Product/scents"
  private homeProducts = "https://localhost:7012/api/Product/homeProducts";
  private productById = "https://localhost:7012/api/Product"
  constructor(private http:HttpClient) { }

  getProducts(params: ProductParams): Observable<Paging> {
    let httpParams = new HttpParams()
      .set('PageIndex', params.PageIndex.toString())
      .set('PageSize', params.PageSize.toString());
  
    // Append Scents
    if (params.Scent.length) {
      params.Scent.forEach(scent => {
        httpParams = httpParams.append('Scents', scent);
      });
    }
  
    // Append Categories
    if (params.Categories.length) {
      params.Categories.forEach(category => {
        httpParams = httpParams.append('CategoryIds', category);
      });
    }
    
    return this.http.get<Paging>(this.baseUrl, { params: httpParams });
  }
  
  getDashboardProducts(params: ProductParams): Observable<PagingDash> {
    let httpParams = new HttpParams()
      .set('PageIndex', params.PageIndex.toString())
      .set('PageSize', params.PageSize.toString());
  
    // Append Scents
    if (params.Scent.length) {
      params.Scent.forEach(scent => {
        httpParams = httpParams.append('Scents', scent);
      });
    }
  
    // Append Categories
    if (params.Categories.length) {
      params.Categories.forEach(category => {
        httpParams = httpParams.append('CategoryIds', category);
      });
    }
    
    return this.http.get<PagingDash>(`${this.baseUrl}/dashboard-products`, { params: httpParams });
  }
  

  getScents():Observable<string[]>{
    return this.http.get<string[]>(this.scentUrl);
  }

  getHomeProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.homeProducts);
  }

  getDaialyOfferProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/porducts/DailyOffers`) ;
  }

  getBestSellerProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/porducts/BestSellers`) ;

  }

  getProductById(id:number):Observable<ProductDetails>{
    return this.http.get<ProductDetails>(`${this.productById}/${id}`);
  }

  updateProduct(formData: FormData, id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-product/${id}`, formData);
 }
 
 addProduct(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/add-product`, formData);
}

  addVariants(productId: number, variants: ProductVariant[]):Observable<void>{
    return this.http.put<void>(`/api/products/add-productVariant/${productId}`, variants);

  }

  updateProductVariants(productId: number, variants: ProductVariantDash[]): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update-productVariant/${productId}`, variants,
      { headers: { 'Content-Type': 'application/json' } });
  }


}
