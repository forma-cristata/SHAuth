import {Component, OnInit} from '@angular/core';
import {InfoButtonComponent} from '../info-button/info-button.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {CircuitAnimationComponent} from '../circuit-animation/circuit-animation.component';
import {getCookie, setCookie} from '../get-cookie.component';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Octokit} from 'octokit';
import {LoadingIconComponent} from '../loading-icon/loading-icon.component';
import {ManualPollButtonComponent} from '../manual-poll-button/manual-poll-button.component';
import {ToastNotificationComponent} from '../toast-notification/toast-notification.component';
import {Toast} from '../toast';
import {TitleComponent} from '../title/title.component';

@Component({
  selector: 'app-class-choice-view',
  imports: [
    InfoButtonComponent,
    ProfileButtonComponent,
    HomeButtonComponent,
    CircuitAnimationComponent,
    FormsModule,
    LoadingIconComponent,
    ManualPollButtonComponent,
    RouterLink,
    ToastNotificationComponent,
    TitleComponent,
  ],
  standalone: true,
  templateUrl: './class-choice-view.component.html',
  styleUrl: './class-choice-view.component.css'
})
export class ClassChoiceViewComponent implements OnInit {
  public returnedClasses: string[] = [];
  private octokit = new Octokit({});
  public rALength: number[] = [];
  public className: string = "";
  public toast: Toast =
    {
      imgPath: '/info.png',
      toastHeader: 'Class Instructions',
      toastBody: [
        "Click on a class block to select it.",
        "Don't see your class? Click the refresh button to manually update the rendered classes."
      ],
      format: "button",
      link: "/profile",
      description: "More info"
    };

  constructor(private router: Router) {}

  /**
   * Ensures username has been initialized for security purposes.
   * If not, user is redirected to the login page.
   * Displays the loading icon while waiting for classes to be returned.
   */
  async ngOnInit() {
    if (!getCookie('username')) {
      this.router.navigate(['/']);
    }
    setCookie('class', '');
    setCookie('assignment', '');

    await this.setReturnedClasses(getCookie('username')).then(() => {
      document.querySelector('#loading-boxer')!.classList.add('d-none');
      document.querySelector('#classes-table')!.classList.remove('d-none');
    });
  }

  /**
   * Displays the classes resulting from the server's response.
   * @param username
   */
  async setReturnedClasses(username: string) {
    let data = ((await this.octokit.request(`GET http://localhost:3012/classes?username=${encodeURIComponent(username)}`, {}))).data;
    this.returnedClasses = [...data];
    let length = this.returnedClasses.length;
    for (let i = 0; i < length; i += 3) {
      this.rALength.push(i);
    }
  }

  /**
   * When the user selects a classroom, the class is stored in a cookie and the user is redirected to the assignments page.
   * Fades out all the class blocks.
   * @param selectedClass
   */
  selectClass(selectedClass: string) {
    setCookie('class', selectedClass);
    this.className = selectedClass;
    let classBlockers = document.querySelectorAll('.class-blocker');
    for (let i = 0; i < classBlockers.length; i++) {
      setTimeout(() => {
        classBlockers[i].animate({opacity: [1, 0]}, {duration: 500, fill: 'forwards'})
      }, 100 * i);
    }

    setTimeout(() => {
      this.router.navigate(['/assignments'])
    }, 100 * classBlockers.length + 500);
  }


  /**
   * Manually polls the server for classes.
   * Displays the loading icon while waiting for classes to be returned.
   */
  async manualPoll() {
    document.querySelector('#loading-boxer')!.classList.remove('d-none');
    document.querySelector('#classes-table')!.classList.add('d-none');
    ((await this.octokit.request(`GET http://localhost:3009/refresh`, {}))).data;
    document.querySelector('#loading-boxer')!.classList.add('d-none');
    document.querySelector('#classes-table')!.classList.remove('d-none');
    this.router.navigate(['/']);
  }

  showToast() {
    let toast: any = document.querySelector('.toast');
    toast.classList.remove("hide");
    toast.classList.add("show");
  }

  /**
   * Enlarges the profile button when navigating to the profile page.
   */
  transformProfile() {
    document.querySelector('#changing-profile-button')!.classList.remove('d-none');
    document.querySelector('#profile-button')!.classList.add('d-none');
    setTimeout(() => {
      this.router.navigate(['/profile'])
    }, 450);
  }
}
