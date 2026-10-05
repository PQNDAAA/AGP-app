import {inject, Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private toastCtrl = inject(ToastController);


  convertISOtoLocaleDateString(isoString: string) {
    return new Date(isoString).toLocaleDateString();}


  createToast(message: string, duration: number){
    this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top'
    }).then(t => t.present());
  }
}
