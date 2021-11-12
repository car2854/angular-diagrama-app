import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reunion } from 'src/app/models/reunion.model';
import Swal from 'sweetalert2';
import { ReunionService } from '../../services/reunion.service';

import * as download from 'downloadjs';

import * as go from 'gojs';
import { Subscription } from 'rxjs';
import { ReunionSocketService } from '../../services/reunion-socket.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';
const $ = go.GraphObject.make;

import { configPalette, loadPalette2, loadPalette3 } from '../../helpers/loadPalette';
import { configDiagram } from 'src/app/helpers/loadDiagram';
import { actor, appMovil, appWeb, contenido, dataBase } from 'src/app/helpers/loadShapes';
import { Mensaje } from '../../interfaces/mensaje.interface';

@Component({
  selector: 'app-entrar-reunion',
  templateUrl: './entrar-reunion.component.html',
  styleUrls: ['./entrar-reunion.component.css']
})
export class EntrarReunionComponent implements OnInit {

  @ViewChild('seleccionarArchivo') cargarArchivo!: ElementRef;
  @ViewChild('paletaNivel2') palette2!: ElementRef;
  @ViewChild('paletaNivel3') palette3!: ElementRef;
  @ViewChild('chatBox') chatBox!: ElementRef;

  private showPalette2: boolean = true;
  private showPalette3: boolean = true;
  private showChat: boolean = false;


  public user! :User;

  public usuariosOnline: User[] = [];

  public mensajes: Mensaje[] = [];

  public reunion!: Reunion;
  public cargando: boolean = true;
  public isAdmin: boolean = false;
  // diagrama

  public diagram!: go.Diagram;
  public miPaleta2!: go.Palette;
  public miPaleta3!: go.Palette;

  // Subcripciones
  private subcriptionEntradaUsuario!: Subscription;
  private subcriptionObtenerDiagrama!: Subscription;
  private subcriptionSalidaUsuario!: Subscription;
  private subcriptionMensaje!: Subscription;

  constructor(
    private router: Router,
    private ruta: ActivatedRoute,
    private reunionServices: ReunionService,
    private reunionSocketService: ReunionSocketService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    actor();
    appMovil();
    appWeb();
    contenido();
    dataBase();

    this.user = this.userService.user;
    const idReunion = this.ruta.snapshot.params.id;

    this.userService.obtenerUsuariosReunion(this.ruta.snapshot.params.id)
      .subscribe((resp:any) => {
        this.usuariosOnline = resp.usuarios;
      }, (err:any) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error')
      });

    this.reunionServices.obtenerReunion(this.ruta.snapshot.params.id)
      .subscribe((resp:any) => {
        
        this.cargando = false;
        this.reunion = resp.reunion;
        this.isAdmin = (this.reunion.user === this.user._id);   
        this.cargarDiagrama();

      }, (err:any) => {
        this.cargando = false;
        Swal.fire('Error', err.error.msg, 'error')
      });

    this.reunionSocketService.entrarReunion(this.user._id, idReunion, this.user.name);

    this.subcriptionEntradaUsuario = this.reunionSocketService.escucharNuevosUsuarios()
      .subscribe((usuario:any) => {
        if (usuario.de !== this.user._id){

          let existe = false;
          this.usuariosOnline.forEach((user:User) => {
            if (user._id === usuario.de) existe = true;
          });

          if (!existe){
            const nuevoUsuario: User = new User(
              usuario.de,
              usuario.nombreUsuario,
              '---'
            );

            this.usuariosOnline.push(nuevoUsuario);
          }

        }
      });
    
    this.subcriptionObtenerDiagrama = this.reunionSocketService.escucharDiagrama()
      .subscribe((resp: any) => {
        if (resp.idUser != this.user._id){
          this.diagram.model = new go.GraphLinksModel(resp.nodeDataArray, resp.linkDataArray);
        }
      });

    this.subcriptionSalidaUsuario = this.reunionSocketService.escucharSalirReunion()
      .subscribe((usuario: any) => {
        
        if (usuario.de !== this.user._id){

          this.usuariosOnline = this.usuariosOnline.filter((user : User) => {
            return (user._id === usuario.de) ? false : true
          }).map((user: User) => {return user});

        }

      });

    this.subcriptionMensaje = this.reunionSocketService.escucharMensajes()
      .subscribe((resp:any) => {
        const mensaje: Mensaje = {
          idUser: resp.de,
          mensaje: resp.mensaje,
          nombreUsuario: resp.nombreUsuario
        }
        this.mensajes.push(mensaje);
      });

  }

  public clickPaleta = (status: string) => {
    if (status === 'nivel2'){
      if (this.showPalette2){
        this.palette2.nativeElement.classList.remove('show2');
        this.palette2.nativeElement.classList.add('hidden');
      }else{
        this.palette2.nativeElement.classList.remove('hidden');
        this.palette2.nativeElement.classList.add('show2');
      }
      this.showPalette2 = !this.showPalette2;
    }else{
      if (this.showPalette3){
        this.palette3.nativeElement.classList.remove('show3');
        this.palette3.nativeElement.classList.add('hidden');
      }else{
        this.palette3.nativeElement.classList.remove('hidden');
        this.palette3.nativeElement.classList.add('show3');
      }
      this.showPalette3 = !this.showPalette3;
    }
  }

  public clickChat = () => {
    if (this.showChat){
      this.chatBox.nativeElement.classList.remove('show-chat');
      this.chatBox.nativeElement.classList.add('hidden-chat');
    }else{
      this.chatBox.nativeElement.classList.remove('hidden-chat');
      this.chatBox.nativeElement.classList.add('show-chat');
    }
    this.showChat = !this.showChat;
  }

  public sendMessage = (event: any) => {
    if (event.code === 'Enter'){
      let target = event.target || event.srcElement
      if(target.value.trim().length > 0){
        // TODO enviar mensaje por Socket
        this.reunionSocketService.enviarMensaje(
          this.reunion._id, 
          this.user._id, 
          this.user.name,
          target.value
        );
        
        target.value = '';
      }
    }
    
  }

  public hiddenChat = (event:any) => {
    
    let existe: boolean = false;
    event.path.forEach((element:any) => {
      if (element.id === 'chatBox'){
        existe = true;
      }
    });
    console.log(existe);
    
    if (!existe && this.showChat){
      this.chatBox.nativeElement.classList.remove('show-chat');
      this.chatBox.nativeElement.classList.add('hidden-chat');
      this.showChat = !this.showChat;
    }
  }

  ngOnDestroy(): void {
    this.subcriptionEntradaUsuario.unsubscribe();
    this.subcriptionObtenerDiagrama.unsubscribe();
    this.subcriptionSalidaUsuario.unsubscribe();
    this.subcriptionMensaje.unsubscribe();

    this.reunionSocketService.salirReunion(this.reunion._id, this.user._id, this.user.name);

    this.reunionServices.salirReunion(this.reunion._id)
      .subscribe((resp:any) => {
        console.log(resp);
      }, (err:any) => {
        console.log(err);
      });
  }

  public cambioT = ($event: KeyboardEvent) => {
    if ($event.code == 'Delete'){
      this.guardarDiagrama();
      this.reunionSocketService.enviarDiagrama(this.diagram.model.toJson(), this.user._id, this.reunion._id);
    }
  }
  
  public cambioM = (e: any) => {
    this.guardarDiagrama();
    this.reunionSocketService.enviarDiagrama(this.diagram.model.toJson(), this.user._id, this.reunion._id);
  }

  public salirReunion = () => {
    this.router.navigateByUrl('/main/listaReuniones');
  }

  public guardarDiagrama = () => {
    this.reunionServices.guardarDiagrama(this.diagram.model.toJson(), this.reunion._id)
      .subscribe((res:any) => {}, (err:any) => {
        Swal.fire('Error', "No se pudo guardar el diagrama", 'error')
      });
  }

  public cargarDiagrama = () => {
    this.reunionServices.cargarDiagrama(this.reunion._id)
      .subscribe((resp:any) => {
        this.diagram.model = new go.GraphLinksModel(resp.jsonDiagrama.nodeDataArray, resp.jsonDiagrama.linkDataArray);
      }, (err:any) => {
        Swal.fire('Error', "No se pudo cargar los datos del diagrama", 'error');
      })
  }

  // descargar Diagrama SVG
  public descargar(){

    const svg = this.diagram.makeSvg({
      scale: 1
    });

    const svgstr = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgstr], {type: "image/svg+xml"});
    var url = window.URL.createObjectURL(blob);
    var filename = `${this.reunion.titulo}.svg`;
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;

    if (window.navigator.msSaveBlob !== undefined) {
      window.navigator.msSaveBlob(blob, filename);
      return;
    }
    document.body.appendChild(a);
    requestAnimationFrame(function() {
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  public descargarDiagrama = () => {
    const diagrama = this.diagram.model.toJson();
    download(diagrama, `${this.reunion.titulo}.json`, "text/plain");
  }

  public ArchivoSeleccionado = (event: Event) => {
    let linkDataArray
    let nodeDataArray
    let target = event.target as HTMLInputElement;
    let file: File = (target.files as FileList)[0];
    let reader = new FileReader();
    if (file.type && !file.type.startsWith('application/json')){
      Swal.fire('Error', 'Archivo incorrecto', 'error')
    }
    reader.onload = (e) => {
      let contenido: string = e.target?.result?.toString() || '';
      const datDiagram = JSON.parse(contenido);
      linkDataArray = datDiagram.linkDataArray;
      nodeDataArray = datDiagram.nodeDataArray;
      this.diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
      this.guardarDiagrama();
      this.reunionSocketService.enviarDiagrama(this.diagram.model.toJson(), this.user._id, this.reunion._id);
    }
    reader.readAsText(file);
  }

  public leerDiagrama = () => {
    this.cargarArchivo.nativeElement.click();
    this.reunionSocketService.enviarDiagrama(this.diagram.model.toJson(), this.user._id, this.reunion._id);
  }

  public ngAfterViewInit() {    
    this.cargarDatosDiagrama();
  }

  public cargarDatosDiagrama(){

    this.diagram = $(go.Diagram, 'diagrama');

    configDiagram(this.diagram);

      // Paleta2 
      this.miPaleta2 = $(go.Palette, "paletaNivel2",{
        initialDocumentSpot: go.Spot.Center,
        initialViewportSpot: go.Spot.Center
      });
      
    configPalette(this.miPaleta2);
    loadPalette2(this.miPaleta2);
  
    this.miPaleta3 = $(go.Palette, "paletaNivel3",{
      initialDocumentSpot: go.Spot.Center,
      initialViewportSpot: go.Spot.Center
    });

    configPalette(this.miPaleta3);
    loadPalette3(this.miPaleta3);

  }

}
