import * as go from 'gojs';
const $ = go.GraphObject.make;

const configPalette = (palette:any) => {

  palette.nodeTemplate = $(go.Node, "Vertical", { 
    locationObjectName: "TB", 
    locationSpot: go.Spot.Center 
  },
    
  $(go.Shape, { 
    width: 40, 
    height: 40, 
    fill: "white",
    figure: "RoundedRectangle"
  }, 
    new go.Binding("fill", "color"),
    new go.Binding("figure", "fig"),
  ),
    
  $(go.TextBlock, { 
    name: "TB",
    alignment: go.Spot.Center
  }, 
    new go.Binding("text", "title"),
  )
  
);

}

const loadPalette2 = (palette:any) => {
  palette.model.nodeDataArray = [
    { key: "S2", color: "#ffffff", title: "Sistema", description: 'Descripcion Sistemas nivel2', fig: "Rectangle" },
    { key: "SE2", color: "#889CA8", title: "Contenedor", description: 'Descripcion Contenedor nivel2', fig: "Contenido" },
    { key: "MA2", color: "#cccccc", title: "Movil App", description: 'Descripcion Movil App nivel2', fig: "AppMovil" },
    { key: "CW2", color: "#cccccc", title: "Contenedor Web", description: 'Descripcion Contenedor Web nivel2', fig: "AppWeb" },
    { key: "P2", color: "#ffffff", title: "Persona", description: 'Descripcion Persona nivel2', fig: "Actor" },
    { key: "BD2", color: "#ffffff", title: "Base de Datos", description: 'Descripcion Base de Datos nivel2', fig: "DataBase" },
  ];
}

const loadPalette3 = (palette:any) => {
  palette.model.nodeDataArray = [
    { key: "S3", color: "#ffffff", title: "Sistema", description: 'Descripcion Sistemas nivel3', fig: "Rectangle", group: 'Nivel3' },
    { key: "Nivel3", color: "#ffffff", title: "Nivel3" , isGroup: "true", size: '180 180'},
  ];
}

export {
  configPalette,
  loadPalette2,
  loadPalette3
}