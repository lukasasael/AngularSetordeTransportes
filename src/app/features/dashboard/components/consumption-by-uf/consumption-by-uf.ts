import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { FuelFacade } from '../../../../core/layout/services/fuel.facade';

@Component({
  selector: 'app-consumption-by-uf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumption-by-uf.html',
})
export class ConsumptionByUfComponent implements AfterViewInit {
  @ViewChild('chart') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private fuelFacade: FuelFacade) {}

  ngAfterViewInit() {
    this.fuelFacade.getConsumptionByUf().subscribe((data) => {
      new Chart(this.chartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: data.map((d) => d.uf),
          datasets: [
            {
              label: 'Litros consumidos',
              data: data.map((d) => d.liters),
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
        },
      });
    });
  }
}
