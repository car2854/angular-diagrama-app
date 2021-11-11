import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email   : ['' , [Validators.required, Validators.email]],
    password: ['' , [Validators.required]]
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  login(){

    this.formSubmitted = true;
    this.userService.login(this.loginForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/main/listaReuniones')
      }, (err) => {
        this.formSubmitted = false;
		console.log(err);
        Swal.fire('Error', err.error.msg, 'error')
      });

  }

}
