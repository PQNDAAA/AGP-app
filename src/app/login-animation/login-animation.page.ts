import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

export type LoginAnimationPhase = 'loading' | 'success';

@Component({
  selector: 'app-login-animation',
  templateUrl: './login-animation.page.html',
  styleUrls: ['./login-animation.page.scss'],
  standalone: false
})
export class LoginAnimationPage implements OnDestroy {

  //DURÉES DE L'ANIMATION (ms)
  readonly loadingDuration = 2600;
  readonly successDuration = 1200;

  phase: LoginAnimationPhase = 'loading';
  statusMessage = 'Connexion en cours';

  private redirectUrl = '/home';
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor(private navCtrl: NavController, private route: ActivatedRoute) { }

  ionViewWillEnter() {
    const redirect = this.route.snapshot.queryParamMap.get('redirect');
    this.redirectUrl = redirect && redirect.startsWith('/') ? redirect : '/home';
    this.phase = 'loading';
    this.statusMessage = 'Connexion en cours';
  }

  ionViewDidEnter() {
    this.clearTimers();
    this.timers.push(setTimeout(() => this.showSuccess(), this.loadingDuration));
  }

  ionViewWillLeave() {
    this.clearTimers();
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  private showSuccess() {
    this.phase = 'success';
    this.statusMessage = 'Connexion réussie';
    this.timers.push(setTimeout(() => this.redirect(), this.successDuration));
  }

  private redirect() {
    this.navCtrl.navigateRoot(this.redirectUrl, { animated: true, animationDirection: 'forward' });
  }

  private clearTimers() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers = [];
  }

}
