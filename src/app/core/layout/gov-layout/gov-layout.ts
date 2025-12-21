import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GovHeaderComponent } from '../gov-header/gov-header';

@Component({
  selector: 'app-gov-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    GovHeaderComponent
  ],
  templateUrl: './gov-layout.html',
  styleUrls: ['./gov-layout.scss']
})
export class GovLayoutComponent {}
