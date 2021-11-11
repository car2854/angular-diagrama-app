import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name          : ['', [Validators.required]],
    email         : ['', [Validators.required, Validators.email]],
    password      : ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  campoNoValido(campo:string):boolean{
    
    if (this.registerForm.get(campo)?.invalid && !this.formSubmitted){
      return true
    }else{
      return false;
    }

  }

  register(){
    if (this.registerForm.invalid || this.formSubmitted){
      return;
    }
    
    this.formSubmitted = true;
    this.userService.register(this.registerForm.value)
    .subscribe( (resp:any) => {
      this.router.navigateByUrl('main/')
    }, (err) => {
      this.formSubmitted = false;
      Swal.fire('Error', err.error.msg, 'error')
    });
  }

}
