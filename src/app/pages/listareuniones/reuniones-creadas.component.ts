import { Component, OnInit } from '@angular/core';
import { ReunionService } from '../../services/reunion.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Reunion } from 'src/app/models/reunion.model';
import Swal from 'sweetalert2';
import { UnirseService } from '../../services/unirse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reuniones-creadas',
  templateUrl: './reuniones-creadas.component.html',
  styleUrls: ['./reuniones-creadas.component.css']
})
export class ReunionesCreadasComponent implements OnInit {

  public reuniones: Reunion[] = [];

  public cargando: boolean = false;
  public cargandoDatos: boolean = true;

  constructor(
    private reunion: ReunionService,
    private unirseService: UnirseService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.reunion.obtenerReuniones()
      .subscribe((resp:any) => {
        this.cargandoDatos = false;
        this.reuniones = resp.reuniones;
      }, (err:any) => {
        console.log(err);
        this.cargandoDatos = false;
        Swal.fire("Error", err.error.msg, 'error');
      });
  }

  public eliminarReunion = (id: string) => {

    this.cargando = true;
    this.reunion.eliminarReunion(id)
      .subscribe((resp:any) => {
        this.cargando = false;
        
        this.reuniones = this.reuniones.filter((reunion : Reunion) => {
          return (reunion._id === resp.reunion._id) ? false : true
        }).map((reunion: Reunion) => {return reunion});
        
        Swal.fire('Terminado', 'Eliminado con exito', 'success');
      }, (err:any) => {
        console.log(err);
        this.cargando = false;
        Swal.fire('Error', err.error.msg, 'error');
      });

  }

  public ingresar = (codigo:string, contrasenia:string) => {

    this.cargando = true;

    const data = {
      'codigo'      : codigo,
      'contrasenia' : contrasenia
    }

    this.unirseService.uniserReunion(data)
      .subscribe((resp:any) => {
        this.cargando = false;
        console.log(resp);
        
        this.router.navigateByUrl(`/main/reunion/${resp.nuevoReunirse.reunion}`);
      }, (err:any) => {
        console.log(err);
        this.cargando = false;
        Swal.fire('Error', err.error.msg, 'error');
      })
    
  }

}
