import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {NavController} from "@ionic/angular";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private navCtrl = inject(NavController);

  checkReq(req: HttpRequest<any>, next: HttpHandler){
    return next.handle(req).pipe(catchError(err => {
      if(err instanceof HttpErrorResponse && err.status === 401){
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.navCtrl.navigateRoot('/auth');
      }
      return throwError(() => err);
    }));
  }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');

      if(token){
        const clone = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return this.checkReq(clone, next);
      }
      return this.checkReq(req, next);
    }
}
