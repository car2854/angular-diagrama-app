import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReunionService } from '../../services/reunion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-reunion',
  templateUrl: './nueva-reunion.component.html',
  styleUrls: ['./nueva-reunion.component.css']
})
export class NuevaReunionComponent implements OnInit {

  public enviarFormulario: Boolean = false;

  public reunionForm = this.fb.group({
    titulo:       ['', [Validators.required]],
    codigo:       [ Date.now() , [Validators.required]],
    contrasenia:  ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private reunion: ReunionService
  ) { }

  ngOnInit(): void {
  }

  public crearReunion = () => {

    this.enviarFormulario = true;
    this.reunion.crearReunion(this.reunionForm.value)
    .subscribe((resp:any) => {
      this.enviarFormulario = false;
      Swal.fire('Registro Correctamente', "Se a registrado correctamente", 'success')
      this.reunionForm.reset();
    },(err:any) => {
      this.enviarFormulario = false;
      console.log(err);
      // this.formSubmitted = false;
      Swal.fire('Error', err.error.msg, 'error')
    });

  }

}
