import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home-button',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './home-button.component.html',
  standalone: true,
  styleUrl: './home-button.component.css'
})
export class HomeButtonComponent {

}
