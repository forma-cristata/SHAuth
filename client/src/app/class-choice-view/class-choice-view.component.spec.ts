import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassChoiceViewComponent } from './class-choice-view.component';
import {provideRouter} from '@angular/router';

describe('ClassChoiceViewComponent', () => {
  let component: ClassChoiceViewComponent;
  let fixture: ComponentFixture<ClassChoiceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassChoiceViewComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassChoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
