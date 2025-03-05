import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router} from '@angular/router';
import { ChangeUsernameComponent } from './change-username.component';
import {FormsModule} from '@angular/forms';

describe('ChangeUsernameComponent', () => {
  let component: ChangeUsernameComponent;
  let fixture: ComponentFixture<ChangeUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ChangeUsernameComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChangeUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
