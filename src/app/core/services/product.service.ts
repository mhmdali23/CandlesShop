import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductParams } from '../../models/productParams';
import { Paging } from '../../models/paging';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = "https://localhost:7012/api/Product"
  private scentUrl = "https://localhost:7012/api/Product/scents"

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
  
    //console.log('Generated HttpParams:', httpParams.toString()); 
  
    return this.http.get<Paging>(this.baseUrl, { params: httpParams });
  }
  

  getScents():Observable<string[]>{
    return this.http.get<string[]>(this.scentUrl);
  }

}
