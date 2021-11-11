import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ReunionesCreadasComponent } from './listareuniones/reuniones-creadas.component';
import { NuevaReunionComponent } from './nuevareunion/nueva-reunion.component';
import { EntrarReunionComponent } from './reunion/entrar-reunion.component';
import { IngresarReunionComponent } from './entrarreunion/ingresar-reunion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    PagesComponent,
    ReunionesCreadasComponent,
    NuevaReunionComponent,
    EntrarReunionComponent,
    IngresarReunionComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
