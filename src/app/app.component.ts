import {Component, HostListener, inject} from '@angular/core';
import {NavController} from "@ionic/angular";
import {InternalControlsService} from "./services/internal-controls-service";
import {AuthService} from "./services/auth/auth-service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  private internalControlsService = inject(InternalControlsService);
  private authService = inject(AuthService);
  private navCtrl = inject(NavController);

  constructor() {
  }

  //Page restaurée depuis le bfcache (boutons précédent/suivant) : l'app n'est pas rechargée
  //et garde l'état d'auth figé au moment où on l'a quittée, on le resynchronise donc ici.
  @HostListener('window:pageshow', ['$event'])
  async onPageShow(event: PageTransitionEvent) {
    if (!event.persisted) return;

    const hasToken = !!(localStorage.getItem('token') ?? sessionStorage.getItem('token'));
    if (hasToken) {
      await this.authService.checkToken();
    } else {
      this.authService.isLoggedIn.set(false);
      this.internalControlsService.clearInternalControls();
    }

    const onAuthPage = window.location.pathname.startsWith('/auth');
    if (!this.authService.isLoggedIn() && !onAuthPage) {
      await this.navCtrl.navigateRoot('/auth', { replaceUrl: true });
    } else if (this.authService.isLoggedIn() && onAuthPage) {
      await this.navCtrl.navigateRoot('/home', { replaceUrl: true });
    }
  }
}
