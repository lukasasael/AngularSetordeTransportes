import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gov-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gov-breadcrumb.html',
  styleUrls: ['./gov-breadcrumb.scss']
})
export class GovBreadcrumbComponent {
  @Input() items: { label: string; url?: string }[] = [];
}
