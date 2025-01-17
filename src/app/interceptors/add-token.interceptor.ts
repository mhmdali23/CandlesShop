import { HttpInterceptorFn } from '@angular/common/http';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem("authToken")
  if(token)
  {
    req=req.clone({setHeaders:{'Authorization':`Bearer ${token}`}})
  }
  return next(req);
};
