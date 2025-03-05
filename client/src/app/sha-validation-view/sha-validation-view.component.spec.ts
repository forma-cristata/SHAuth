import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShaValidationViewComponent } from './sha-validation-view.component';
import {provideRouter} from '@angular/router';

describe('ShaValidationViewComponent', () => {
  let component: ShaValidationViewComponent;
  let fixture: ComponentFixture<ShaValidationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShaValidationViewComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShaValidationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
