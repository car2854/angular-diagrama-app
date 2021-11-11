import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public user!: User;

  constructor(
    private userService: UserService,
    public websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  public cerrarSesion = () => {
	  
	Swal.fire({
	  title: 'Estas seguro que quiere cerrar sesion?',
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si'
	}).then((result) => {
	  if (result.isConfirmed) {
		this.userService.logout();
	  }
	})
	  
  }

}
