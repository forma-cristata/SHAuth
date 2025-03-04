import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProfileViewComponent } from './profile-view.component';
import { getCookie } from '../get-cookie.component';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileViewComponent],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: getCookie, useValue: jasmine.createSpyObj('getCookie', ['getCookie']) }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('should transform home button and navigate to classes', (done) => {
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      return {
        classList: {
          remove: jasmine.createSpy('remove'),
          add: jasmine.createSpy('add')
        }
      };
    });

    component.transformHome();

    setTimeout(() => {
      expect(document.querySelector('#home-button-changing')!.classList.remove).toHaveBeenCalledWith('d-none');
      expect(document.querySelector('#home-button')!.classList.add).toHaveBeenCalledWith('d-none');
      expect(router.navigate).toHaveBeenCalledWith(['/classes']);
      done();
    }, 450);
  });
});
