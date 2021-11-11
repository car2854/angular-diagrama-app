import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const url_sitio = environment.url_sitio;

@Injectable({
  providedIn: 'root'
})

export class ReunionService {

  constructor(
    private http: HttpClient
  ) { }

  get token(){
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  public obtenerReuniones = () => {
    return this.http.get(`${url_sitio}/pizarra`, this.headers);
  }

  public obtenerReunion = (id: string) => {
    return this.http.get(`${url_sitio}/pizarra/${id}`, this.headers);
  }

  public crearReunion = (body: any) => {
    return this.http.post(`${url_sitio}/pizarra`, body, this.headers);
  }

  public eliminarReunion = (id: string) => {
    return this.http.delete(`${url_sitio}/pizarra/${id}`, this.headers);
  }

  public guardarDiagrama = (diagrama: any, reunion: string) => {
    
    const data = {
      'diagrama': diagrama,
      'reunion': reunion
    }

    return this.http.post(`${url_sitio}/pizarra/guardarDiagrama`, data, this.headers);
  }

  public cargarDiagrama = (diagrama : string) => {
    return this.http.get(`${url_sitio}/pizarra/cargarDiagrama/${diagrama}`, this.headers);
  }

  public salirReunion = (idReunion: string) => {
    return this.http.delete(`${url_sitio}/entrar/${idReunion}`, this.headers);
  }
}
