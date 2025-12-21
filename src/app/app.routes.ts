import { Routes } from '@angular/router';
import { GovLayoutComponent } from './core/layout/gov-layout/gov-layout';
import { HomeComponent } from './features/home/home';
import { DashboardComponent } from './features/dashboard/dashboard';
import { ConsultaComponent } from './features/consulta/consulta';
import { DetalheComponent } from './features/detalhe/detalhe';
import { NotFoundComponent } from './features/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: GovLayoutComponent,
    children: [
      { path: '', component: HomeComponent },        // 👈 NOVA HOME
      { path: 'dashboard', component: DashboardComponent },
      { path: 'consulta', component: ConsultaComponent },
      { path: 'detalhe/:id', component: DetalheComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
