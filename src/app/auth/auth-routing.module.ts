import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registro/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: 'autenticacion',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: '/main/listaReuniones', pathMatch: 'full' },
      { path: '**', redirectTo: '/main/listaReuniones' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
