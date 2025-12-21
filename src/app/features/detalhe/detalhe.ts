import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FuelFacade } from '../../core/layout/services/fuel.facade';
import { GovBreadcrumbComponent } from '../../shared/components/gov-breadcrumb/gov-breadcrumb';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, GovBreadcrumbComponent],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.scss',
})
export class DetalheComponent implements OnInit {
  record: any;

  constructor(
    private route: ActivatedRoute,
    private fuelFacade: FuelFacade
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.fuelFacade.getById(id).subscribe((data) => {
      this.record = data;
    });
  }

  maskCpf(cpf: string): string {
    return cpf.replace(
      /^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/,
      '$1.$2.***-$4'
    );
  }
}
