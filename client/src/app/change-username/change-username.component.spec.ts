import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router} from '@angular/router';
import { ChangeUsernameComponent } from './change-username.component';
import {FormsModule} from '@angular/forms';

describe('ChangeUsernameComponent', () => {
  let component: ChangeUsernameComponent;
  let fixture: ComponentFixture<ChangeUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ChangeUsernameComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChangeUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the username and set the cookie', () => {

    const newUsername = 'newUser';
    component.username = newUsername;
    component.createUsernameCookie();
    const nameLenPlus = (newUsername.length + 1);
    let cookie = document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${newUsername}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || "";
    expect(cookie).toBe(newUsername);
  });


// This one is fucked.
});
