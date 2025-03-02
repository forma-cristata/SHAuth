import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {getCookie} from '../get-cookie.component';

@Component({
  selector: 'app-registration-form',
  imports: [
    FormsModule
  ],
  templateUrl: './registration-form.component.html',
  standalone: true,
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements OnInit {
  public termLengthInSeconds: string = new Date(Date.now() + 24 * 60 * 60 * 7 * 14 * 1000).toUTCString();
  public username: string = '';

  constructor(private router: Router) {}

  /**
   * Ensures username has been initialized for security purposes.
   */
  ngOnInit() {
    if (getCookie('username')) {
      // reroute to classes page
      this.router.navigate(['/classes']);
    }
  }

  /**
   * Sets the username cookie for session management.
   */
  createUsernameCookie() {
    if (this.usernameStandardizationMatchingCheck() && this.username.length > 0) {
      document.cookie = `username=${this.username}; expires=${(this.termLengthInSeconds)}`;
      this.username = '';
      this.router.navigate(['/classes']);
    } else {
      this.username = "";
    }
  }

  /**
   * Form validation:
   * - Username must be 39 characters or fewer.
   * - Username must only contain alphanumeric characters and dashes.
   * - These parameters match GitHub's username standardization.
   */
  usernameStandardizationMatchingCheck(): boolean {
    let validLength = true;
    let validCharacters = true;

    if (this.username.length > 39) {
      alert('Username is too long. Please enter a username that is 39 characters or less.');
      validLength = false;
    }
    for (let i = 0; i < this.username.length; i++) {
      if (!this.username[i].match(/[a-zA-Z0-9-]/)) {
        validCharacters = false;
      }
    }
    if (!validCharacters) {
      alert('Username contains an invalid character. Please enter a username that only contains alphanumeric characters and dashes.');
    }
    return validCharacters && validLength;
  }
}
