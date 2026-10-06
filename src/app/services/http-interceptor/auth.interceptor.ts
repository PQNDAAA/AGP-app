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
import {UtilsService} from "../utils/utils-service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private navCtrl = inject(NavController);
  private utilsService = inject(UtilsService);

   checkReq(req: HttpRequest<any>, next: HttpHandler){
    return next.handle(req).pipe(catchError( err => {
      if(err instanceof HttpErrorResponse && err.status === 401 && !req.url.includes('/auth/login')){
        if(localStorage.getItem('token') || sessionStorage.getItem('token')){
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          this.utilsService.createToast('Votre session a expiré, veuillez vous reconnecter.', 2000);
        }
        const current = window.location.pathname;
        if(!current.startsWith('/auth')){
          this.navCtrl.navigateRoot('/auth');
          console.log('Redirect to login')
        }
      } else if(err instanceof HttpErrorResponse && err.status >= 500){
        this.utilsService.createToast('Une erreur est survenue, veuillez réessayer plus tard.', 2000);
      } else if(err instanceof HttpErrorResponse && err.status === 429){
        this.utilsService.createToast('Trop de tentatives, veuillez réessayer dans quelques minutes.', 2000);
      } else if(err instanceof HttpErrorResponse && err.status === 0){
        this.utilsService.createToast('Erreur réseau, veuillez vérifier votre connexion internet.', 2000);
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
