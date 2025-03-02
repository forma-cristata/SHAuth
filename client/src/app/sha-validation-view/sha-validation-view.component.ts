import {Component, OnInit} from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {Router, RouterLink} from '@angular/router';
import '../get-cookie.component';
import {getCookie} from '../get-cookie.component';
import {Octokit} from 'octokit';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingIconComponent} from '../loading-icon/loading-icon.component';
import {Toast} from '../toast';
import {ToastNotificationComponent} from '../toast-notification/toast-notification.component';
import {TitleComponent} from '../title/title.component';

@Component({
  selector: 'app-sha-validation-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent,
    HomeButtonComponent,
    BackButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    LoadingIconComponent,
    ToastNotificationComponent,
    RouterLink,
    TitleComponent,
  ],
  templateUrl: './sha-validation-view.component.html',
  standalone: true,
  styleUrl: './sha-validation-view.component.css'
})
export class ShaValidationViewComponent implements OnInit {
  private octokit = new Octokit({});
  public username: string = '';
  public assignmentName: string = '';
  public className: string = '';
  public sHAToCheck: string = '';
  public feedback: string = '';
  private validText: string = 'var(--gh-green)';
  private invalidText: string = 'var(--dark-magenta)';

  public toast: Toast =
    {
      imgPath: '/info.png',
      toastHeader: 'SHA Instructions',
      toastBody: [
        "Enter the commit ID you wish to submit. The input will turn green if valid and magenta if invalid. Feedback will be provided after you submit an SHA."
      ],
      format: "button",
      link: "/profile",
      description: "More info"
    };

  constructor(private router: Router) {}

  /**
   * Ensures username, class, and assignment have been initialized for security purposes.
   */
  async ngOnInit() {
    this.username = getCookie('username');
    this.assignmentName = getCookie('assignment');
    this.className = getCookie('class');

    if (!this.username) {
      this.router.navigate(['/']);
    }
    if (!this.className) {
      this.router.navigate(['/classes']);
    }
    if (!this.assignmentName) {
      this.router.navigate(['/assignments']);
    }
  }

  /**
   * Gets feedback from server regarding SHA validity.
   */
  async setReturnedSHAs() {
    this.feedback = this.sHAToCheck.length === 40 ? ((await this.octokit.request(`GET http://localhost:3012/shas?username=${encodeURIComponent(this.username)}&classname=${encodeURIComponent(this.className)}&assignment=${encodeURIComponent(this.assignmentName)}&sha=${encodeURIComponent(this.sHAToCheck)}`, {}))).data[0] : 'IInvalid SHA length.';
    this.parseFeedback();
  }

  /**
   * Uses colors and char[0] to indicate whether commit is valid or invalid.
   */
  parseFeedback() {
    const indicator = this.feedback[0];
    this.feedback = this.feedback.substring(1);
    if (indicator === 'I') {
      document.querySelector('.form-floating')!.setAttribute('style', `-webkit-box-shadow:0px 0px 10px 0px ${this.invalidText}; -moz-box-shadow: 0px 0px 10px 0px ${this.invalidText}; box-shadow: 0px 0px 10px 0px ${this.invalidText};`);
    } else {
      document.querySelector('.form-floating')!.setAttribute('style', `-webkit-box-shadow:0px 0px 10px 0px ${this.validText}; -moz-box-shadow: 0px 0px 10px 0px ${this.validText}; box-shadow: 0px 0px 10px 0px ${this.validText};`);
    }
  }

  /**
   * Shows loading icon while checking the SHA validity.
   */
  async checkSHA() {
    this.feedback = '';
    document.querySelector('.form-floating')!.setAttribute('style', `-webkit-box-shadow:0px 0px 0px 0px ${this.validText}; -moz-box-shadow: 0px 0px 0px 0px ${this.validText}; box-shadow: 0px 0px 0px 0px ${this.validText};`);
    document.querySelector('#loading-boxer')!.classList.remove('d-none');
    document.querySelector('#sha-checker-btn')!.classList.add('silence');
    await this.setReturnedSHAs().then(() => {
      document.querySelector('#loading-boxer')!.classList.add('d-none');
      document.querySelector('#sha-checker-btn')!.classList.remove('silence');
    });
  }

  showToast() {
    let toast: any = document.querySelector('.toast');
    toast.classList.remove("hide");
    toast.classList.add("show");
  }

  /**
   * Enlarges profile icon when navigating to profile page.
   */
  transformProfile() {
    document.querySelector('#changing-profile-button')!.classList.remove('d-none');
    document.querySelector('#profile-button')!.classList.add('d-none');
    setTimeout(() => {
      this.router.navigate(['/profile'])
    }, 450);
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

