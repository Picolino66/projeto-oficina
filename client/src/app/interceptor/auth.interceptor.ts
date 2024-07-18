import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Suponha que o token esteja armazenado no localStorage
    const authToken = localStorage.getItem('token');

    // Clona a requisição para adicionar o cabeçalho de autorização
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    // Passa a requisição clonada ao próximo handler
    return next.handle(authReq);
  }
}
