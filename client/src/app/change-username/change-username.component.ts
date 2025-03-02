import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {getCookie} from '../get-cookie.component';

@Component({
  selector: 'app-change-username',
  imports: [
    FormsModule
  ],
  templateUrl: './change-username.component.html',
  standalone: true,
  styleUrl: './change-username.component.css'
})
export class ChangeUsernameComponent implements OnInit {
  public termLengthInSeconds: string = new Date(Date.now() + 24 * 60 * 60 * 7 * 14 * 1000).toUTCString();
  public username: string = getCookie("username");

  constructor(private router: Router) {}

  /**
   * Sets term length variable to be 13 weeks from initialization of username.
   */
  ngOnInit() {
    this.termLengthInSeconds = new Date(Date.now() + 24 * 60 * 60 * 7 * 14 * 1000).toUTCString();
  }

  /**
   * Creates a cookie with the username and navigates to the classes page.
   * This allows user to remain "logged in"
   */
  createUsernameCookie() {
    let username = this.username;
    document.cookie = `username=${username}; expires=${(this.termLengthInSeconds)}`;
    this.username = '';
    this.router.navigate(['/classes']);
  }
}
