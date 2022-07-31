import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class PortInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

 /**
  * La función intercepta la solicitud, la clona y agrega el token al encabezado
  * @param req - HttpRequest<any> - El objeto de la solicitud
  * @param {HttpHandler} next - HttpHandler - el próximo interceptor en la cadena
  * @returns La solicitud se devuelve con el token adjunto al encabezado.
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req;
    const token = this.tokenService.getToken();
    if(token != null) {
      intReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token)})
    } 
    return next.handle(intReq);
  }
}

export const InterceptProvider = [{provide: HTTP_INTERCEPTORS, useClass: PortInterceptorService, multi: true}];
