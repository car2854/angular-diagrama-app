import { Component, OnInit } from '@angular/core';
import { UnirseService } from '../../services/unirse.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar-reunion',
  templateUrl: './ingresar-reunion.component.html',
  styleUrls: ['./ingresar-reunion.component.css']
})
export class IngresarReunionComponent{

  public ingresarForm = this.fb.group({
    codigo      : ['', [Validators.required]],
    contrasenia  : ['', [Validators.required]]
  });

  cargando: Boolean = false;

  constructor( private fb: FormBuilder, private router: Router, private unirseService: UnirseService,) { }

  ingresar = () => {
    this.cargando = true;
    this.unirseService.uniserReunion(this.ingresarForm.value).subscribe((resp:any) => {
      this.cargando = false;
      this.router.navigateByUrl(`/main/reunion/${resp.nuevoReunirse.reunion}`);
    }, (err:any) => {
      console.log(err);
      this.cargando = false;
      Swal.fire('Error', err.error.msg, 'error');
    });
  }
}
