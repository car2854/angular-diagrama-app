import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';


import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { User } from '../models/user.model';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';

const url_sitio = environment.url_sitio;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user! : User;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  get token(): string{
    return localStorage.getItem('token') || '';
  }

  saveLocalStorage(token: string){
    localStorage.setItem('token', token);
  }

  validateToken(): Observable<boolean>{
    return this.http.get(`${url_sitio}/autenticacion/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        this.user = resp.usuario;
        this.saveLocalStorage(resp.token);
        return true

      }),
      catchError(err => of(false))
    )
  }

  login(formData: LoginForm){
    
    return this.http.post(`${url_sitio}/autenticacion/login`, formData)
      .pipe(
        tap( (resp: any) => {
          this.saveLocalStorage(resp.token);
          this.user = resp.userDB;
        })
      );

  }

  register(formData: RegisterForm){

    return this.http.post(`${url_sitio}/usuario`, formData)
      .pipe(
        tap( (resp:any) => {
          this.saveLocalStorage(resp.token);
          this.user = resp.user
        })
      );
  
  }

  public obtenerUsuariosReunion = (reunion: string) => {
    return this.http.get(`${url_sitio}/usuario/usuariosReuniones/${reunion}`);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('autenticacion/login');
  }

}
