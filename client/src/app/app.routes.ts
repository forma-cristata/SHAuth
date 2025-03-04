import { Routes } from '@angular/router';
import { RegistrationViewComponent } from './registration-view/registration-view.component';
import {ClassChoiceViewComponent} from './class-choice-view/class-choice-view.component';
import {AssignmentChoiceViewComponent} from './assignment-choice-view/assignment-choice-view.component';
import {ShaValidationViewComponent} from './sha-validation-view/sha-validation-view.component';
import {ProfileViewComponent} from './profile-view/profile-view.component';
import {LoadingIconComponent} from './loading-icon/loading-icon.component';

export const routes: Routes = [
  {path: '', component: RegistrationViewComponent, title: "Register"},
  {path: 'classes', component: ClassChoiceViewComponent, title: "Home"},
  {path: 'assignments', component: AssignmentChoiceViewComponent, title: "Assignments"},
  {path: 'sha-validation', component: ShaValidationViewComponent, title: "SHA Validation"},
  {path: 'profile', component: ProfileViewComponent, title: "Profile & Info"},
];
