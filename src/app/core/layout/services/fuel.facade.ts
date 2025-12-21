import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FuelRecord } from '../models/fuel.model';

@Injectable({
  providedIn: 'root',
})
export class FuelFacade {
  private readonly apiUrl = 'http://localhost:3000/fuels';

  constructor(private http: HttpClient) {}

  // =========================
  // BASE
  // =========================

  getAll(): Observable<FuelRecord[]> {
    return this.http.get<FuelRecord[]>(this.apiUrl);
  }

  getById(id: number): Observable<FuelRecord> {
    return this.http.get<FuelRecord>(`${this.apiUrl}/${id}`);
  }

  // =========================
  // KPIs
  // =========================

  getAveragePrice(): Observable<number> {
    return this.getAll().pipe(
      map(
        (records) =>
          records.reduce((acc, r) => acc + r.pricePerLiter, 0) /
          (records.length || 1)
      )
    );
  }

  getTotalLiters(): Observable<number> {
    return this.getAll().pipe(
      map((records) => records.reduce((acc, r) => acc + r.liters, 0))
    );
  }

  getTotalStations(): Observable<number> {
    return this.getAll().pipe(
      map((records) => new Set(records.map((r) => r.station)).size)
    );
  }

  // =========================
  // GRÁFICOS
  // =========================

  getPriceEvolution(): Observable<{ date: string; price: number }[]> {
    return this.getAll().pipe(
      map((records) =>
        [...records]
          .sort((a, b) => a.date.localeCompare(b.date))
          .map((r) => ({
            date: r.date,
            price: r.pricePerLiter,
          }))
      )
    );
  }

  getConsumptionByUf(): Observable<{ uf: string; liters: number }[]> {
    return this.getAll().pipe(
      map((records) => {
        const mapByUf: Record<string, number> = {};

        for (const r of records) {
          mapByUf[r.uf] = (mapByUf[r.uf] || 0) + r.liters;
        }

        return Object.entries(mapByUf).map(([uf, liters]) => ({
          uf,
          liters,
        }));
      })
    );
  }

  // =========================
  // CONSULTA / FILTROS
  // =========================

  filterRecords(
    uf?: string,
    fuelType?: string,
    startDate?: string,
    endDate?: string
  ): Observable<FuelRecord[]> {
    return this.getAll().pipe(
      map((records) =>
        records.filter((r) => {
          const recordDate = new Date(r.date).getTime();

          return (
            (!uf || r.uf === uf) &&
            (!fuelType || r.fuelType === fuelType) &&
            (!startDate || recordDate >= new Date(startDate).getTime()) &&
            (!endDate || recordDate <= new Date(endDate).getTime())
          );
        })
      )
    );
  }
}
