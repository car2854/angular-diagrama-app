import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guard/auth.guard';
import { ReunionesCreadasComponent } from './listareuniones/reuniones-creadas.component';
import { NuevaReunionComponent } from './nuevareunion/nueva-reunion.component';
import { EntrarReunionComponent } from './reunion/entrar-reunion.component';
import { IngresarReunionComponent } from './entrarreunion/ingresar-reunion.component';

const routes: Routes = [
  {
    path: 'main',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
 
      { path: 'listaReuniones', component: ReunionesCreadasComponent },
      { path: 'nuevaReunion', component: NuevaReunionComponent },
      { path: 'reunion/:id', component: EntrarReunionComponent },
      { path: 'entrarReunion', component: IngresarReunionComponent },
      
      { path: '', redirectTo: '/main/listaReuniones', pathMatch: 'full' },
      { path: '**', redirectTo: '/main/listaReuniones' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
