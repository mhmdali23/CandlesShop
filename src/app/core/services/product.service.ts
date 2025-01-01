import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductParams } from '../../models/productParams';
import { Paging } from '../../models/paging';
import { Product } from '../../models/product';
import { ProductDetails } from '../../models/productDetails';
import { UpdateProduct } from '../../models/updateProduct';

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
  

  getScents():Observable<string[]>{
    return this.http.get<string[]>(this.scentUrl);
  }

  getHomeProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.homeProducts);
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

}
