import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FuelFacade } from '../../core/layout/services/fuel.facade';
import { FuelRecord } from '../../core/layout/models/fuel.model';
import { RouterModule } from '@angular/router';
import { GovBreadcrumbComponent } from '../../shared/components/gov-breadcrumb/gov-breadcrumb';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, GovBreadcrumbComponent],
  templateUrl: './consulta.html',
  styleUrls: ['./consulta.scss'],
})
export class ConsultaComponent implements OnInit {
  records: FuelRecord[] = [];

  ufs = ['SP', 'RJ', 'MG', 'PR', 'AM', 'SC'];
  fuelTypes = ['Gasolina', 'Etanol', 'Diesel'];

  uf = '';
  fuelType = '';
  startDate = '';
  endDate = '';
  pageSize = 5;
  currentPage = 1;
  pagedRecords: FuelRecord[] = [];

  constructor(private fuelFacade: FuelFacade) {}

  ngOnInit() {
    this.applyFilter();
  }

  applyFilter() {
    this.fuelFacade
      .filterRecords(this.uf, this.fuelType, this.startDate, this.endDate)
      .subscribe((data) => {
        this.records = data;
        this.currentPage = 1;
        this.updatePage();
      });
  }
  updatePage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedRecords = this.records.slice(start, end);
  }
}
