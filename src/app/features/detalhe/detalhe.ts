import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, catchError, of } from 'rxjs';
import { inject } from '@angular/core';

import { GovBreadcrumbComponent } from '../../shared/components/gov-breadcrumb/gov-breadcrumb';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule, GovBreadcrumbComponent],
  templateUrl: './detalhe.html',
  styleUrls: ['./detalhe.scss'],
})
export class DetalheComponent implements OnInit {
  private readonly apiUrl = 'http://localhost:3000/fuels';


  constructor(private http: HttpClient) {}

  private route = inject(ActivatedRoute);
  id: string | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  record$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => {
      if (!id) return of(null);
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }),
    catchError(() => of(null))
  );

  maskCpf(cpf: string): string {
    if (!cpf) return '';
    return cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/, '$1.$2.***-$4');
  }

  reportError(recordId: number) {
    console.log('Erro reportado para o registro:', recordId);
    alert('Erro reportado com sucesso (simulação)');
  }
}
