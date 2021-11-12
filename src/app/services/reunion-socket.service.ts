import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ReunionSocketService {

  constructor(
    private webSocketService: WebsocketService
  ) { }
  
  public enviarDiagrama = (diagrama:any, idUsuario: string, idReunion: string) => {
    const res = JSON.parse(diagrama);
    const payload = { 
      ...res, 
      idMeeting: idReunion, 
      idUser: idUsuario 
    }
    this.webSocketService.emit('emitirDiagrama', payload);
  }
  
  public entrarReunion = (idUsuario: string, idReunion: string, nombreUsuario: string) => {
    const payload = {
      de: idUsuario, 
      room: idReunion, 
      nombreUsuario
    };
    this.webSocketService.emit('entrarReunion', payload);
  }
  
  public salirReunion = (reunion: string, idUsuario: string, nombreUsuario: string) => {
    const payload = {
      de: idUsuario,
      room: reunion,
      nombreUsuario
    };
    this.webSocketService.emit('abandonarReunion', payload);
  }

  public enviarMensaje = (reunion: string, idUsuario: string, nombreUsuario: string, mensaje: string) => {
    const payload = {
      de: idUsuario,
      room: reunion,
      nombreUsuario,
      mensaje
    }
    this.webSocketService.emit('enviarMensaje', payload);
  }

  public kickUser = (reunion: string, idUsuario: string, idUsuarioKick: string) => {
    const payload = {
      de: idUsuario,
      room: reunion,
      userKick: idUsuarioKick
    }
    this.webSocketService.emit('kickUser', payload);
  }

  public escucharKickUser = () => {
    return this.webSocketService.listen('escucharKickUser');
  }
  
  public escucharMensajes = () => {
    return this.webSocketService.listen('escucharMensajes')
  }

  public escucharSalirReunion = () => {
    return this.webSocketService.listen('escucharDejarusuario');
  }

  public escucharDiagrama = () => {
    return this.webSocketService.listen('escucharDiagrama');
  }

  public escucharNuevosUsuarios = () => {
    return this.webSocketService.listen('escucharNuevoUsuario');
  }
  

}
