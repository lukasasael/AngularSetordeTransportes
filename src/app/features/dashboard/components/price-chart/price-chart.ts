import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { FuelFacade } from '../../../../core/layout/services/fuel.facade';

@Component({
  selector: 'app-price-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-chart.html',
})
export class PriceChartComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private fuelFacade: FuelFacade) {}

  ngAfterViewInit() {
    this.fuelFacade.getPriceEvolution().subscribe(data => {
      new Chart(this.canvas.nativeElement, {
        type: 'line',
        data: {
          labels: data.map(d => d.date),
          datasets: [
            {
              label: 'Preço por Litro',
              data: data.map(d => d.price),
              borderWidth: 2
            }
          ]
        }
      });
    });
  }
}
