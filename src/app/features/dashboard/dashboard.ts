import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuelFacade } from '../../core/layout/services/fuel.facade';
import { KpiCardComponent } from './components/kpi-card/kpi-card';
import { PriceChartComponent } from './components/price-chart/price-chart';
import { GovBreadcrumbComponent } from '../../shared/components/gov-breadcrumb/gov-breadcrumb';
import { ConsumptionByUfComponent } from './components/consumption-by-uf/consumption-by-uf';


@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, KpiCardComponent, PriceChartComponent, GovBreadcrumbComponent, ConsumptionByUfComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  avgPrice$!: ReturnType<FuelFacade['getAveragePrice']>;
  totalLiters$!: ReturnType<FuelFacade['getTotalLiters']>;
  stations$!: ReturnType<FuelFacade['getTotalStations']>;

  constructor(private fuelFacade: FuelFacade) {}

  ngOnInit() {
    this.avgPrice$ = this.fuelFacade.getAveragePrice();
    this.totalLiters$ = this.fuelFacade.getTotalLiters();
    this.stations$ = this.fuelFacade.getTotalStations();
  }
}
