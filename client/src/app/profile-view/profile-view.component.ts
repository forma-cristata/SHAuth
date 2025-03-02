import {Component, OnInit} from '@angular/core';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {Router} from '@angular/router';
import {getCookie} from '../get-cookie.component';
import {ChangeUsernameComponent} from '../change-username/change-username.component';
import {InfoButtonComponent} from '../info-button/info-button.component';

@Component({
  selector: 'app-profile-view',
  imports: [
    ProfileButtonComponent,
    HomeButtonComponent,
    CircuitAnimationComponent,
    ChangeUsernameComponent,
    InfoButtonComponent,
  ],
  templateUrl: './profile-view.component.html',
  standalone: true,
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent implements OnInit {
  public username: string = '';

  constructor(private router: Router) {}

  /**
   * Ensures username has been initialized for security purposes.
   */
  ngOnInit() {
    if (!getCookie('username')) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Enlarges home icon when navigating to home page.
   */
  transformHome() {
    document.querySelector('#home-button-changing')!.classList.remove('d-none');
    document.querySelector('#home-button')!.classList.add('d-none');
    setTimeout(() => {
      this.router.navigate(['/classes'])
    }, 450);
  }
}
