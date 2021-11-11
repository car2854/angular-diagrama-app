import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ReunionSocketService {

  constructor(
    private webSocketService: WebsocketService
  ) { }
  
  public escucharNuevosUsuarios = () => {
    return this.webSocketService.listen('escucharNuevoUsuario');
  }
  
  public enviarDiagrama = (diagrama:any, idUsuario: string, idReunion: string) => {
    const res = JSON.parse(diagrama);
    const payload = { ...res, 'idMeeting': idReunion, 'idUser': idUsuario }
    this.webSocketService.emit('emitirDiagrama', payload);
  }
  
  public entrarReunion = (idUsuario: string, idReunion: string, nombreUsuario: string) => {
    const payload = {de: idUsuario, room: idReunion, nombreUsuario: nombreUsuario};
    this.webSocketService.emit('entrarReunion', payload);
  }
  
  public escucharSalirReunion = () => {
    console.log("salio un usuario");
    return this.webSocketService.listen('escucharDejarusuario');
  }
  
  public salirReunion = (reunion: string, idUsuario: string, nombreUsuario: string) => {
    const payload = {
      de: idUsuario,
      room: reunion,
      nombreUsuario: nombreUsuario
    };
    this.webSocketService.emit('abandonarReunion', payload);
  }

  public escucharDiagrama = () => {
    return this.webSocketService.listen('escucharDiagrama');
  }


}
