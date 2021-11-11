import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const url_sitio = environment.url_sitio;

@Injectable({
  providedIn: 'root'
})
export class UnirseService {

  constructor(
    private http: HttpClient
  ) { }

  private get token() {
    return localStorage.getItem('token') || '';
  }
  
  private get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  public uniserReunion = (data: any) => {
    
    return this.http.post(`${url_sitio}/entrar`, data, this.headers);
  }
}
