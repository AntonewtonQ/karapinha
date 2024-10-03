import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth=Inject(AuthService);

  const token= auth.getToken();

  if(token){
    req =req.clone({
      setHeaders:{Authorization:'Good'}
    });
  }

  return next(req);
};
