import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, map, switchMap, shareReplay } from 'rxjs';

import { FuelFacade } from '../../core/layout/services/fuel.facade';
import { FuelRecord } from '../../core/layout/models/fuel.model';
import { GovBreadcrumbComponent } from '../../shared/components/gov-breadcrumb/gov-breadcrumb';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, GovBreadcrumbComponent],
  templateUrl: './consulta.html',
  styleUrls: ['./consulta.scss'],
})
export class ConsultaComponent {
  ufs = ['SP', 'RJ', 'MG', 'PR', 'AM', 'SC'];
  fuelTypes = ['Gasolina', 'Etanol', 'Diesel'];

  uf = '';
  fuelType = '';

  pageSize = 5;

  currentPage$ = new BehaviorSubject<number>(1);
  private filters$ = new BehaviorSubject<{ uf: string; fuelType: string }>({
    uf: '',
    fuelType: '',
  });

  /** 🔹 registros filtrados (fonte única) */
  private filteredRecords$ = combineLatest([
    this.filters$,
  ]).pipe(
    switchMap(([filters]) =>
      this.fuelFacade.filterRecords(filters.uf, filters.fuelType)
    ),
    shareReplay(1)
  );

  /** 🔹 total de páginas */
  totalPages$ = this.filteredRecords$.pipe(
    map(records => Math.max(1, Math.ceil(records.length / this.pageSize)))
  );

  /** 🔹 registros paginados */
  pagedRecords$ = combineLatest([
    this.filteredRecords$,
    this.currentPage$,
  ]).pipe(
    map(([records, page]) => {
      const start = (page - 1) * this.pageSize;
      return records.slice(start, start + this.pageSize);
    })
  );

  /** 🔹 controles de navegação */
  canGoPrev$ = this.currentPage$.pipe(
    map(page => page > 1)
  );

  canGoNext$ = combineLatest([
    this.currentPage$,
    this.totalPages$,
  ]).pipe(
    map(([page, total]) => page < total)
  );

  constructor(private fuelFacade: FuelFacade) {
    // carga inicial
    this.applyFilter();
  }

  applyFilter() {
    this.currentPage$.next(1);
    this.filters$.next({
      uf: this.uf,
      fuelType: this.fuelType,
    });
  }

  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  prevPage() {
    this.currentPage$.next(this.currentPage$.value - 1);
  }
}
