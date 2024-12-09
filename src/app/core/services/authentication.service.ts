import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../../models/authenticationRequest';
import { Observable } from 'rxjs';
import { ChangePasswordRequest } from '../../models/changePasswordRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = "https://localhost:7012/api/Auth/";
  constructor(private http:HttpClient) { }

  login(authRequest:AuthenticationRequest): Observable<any>{
    return this.http.post(`${this.baseUrl}login`,authRequest,{responseType:"text"})

  }

  logout(){
    return this.clearToken();
  }

  changePassword(changePasswordReq:ChangePasswordRequest) :Observable<any>{
    return this.http.post(`${this.baseUrl}change-password`,changePasswordReq)
  }

  storeToken(token:string): void{
    localStorage.setItem("authToken",token);
  }

  getToken():string|null{
    return localStorage.getItem("authToken");
  }

  clearToken():void{
    localStorage.removeItem("authToken");
  }

  isAuthenticated():boolean{
    return !!this.getToken();
  }
  
}
