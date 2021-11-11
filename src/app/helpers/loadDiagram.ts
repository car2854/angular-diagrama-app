import * as go from 'gojs';
const $ = go.GraphObject.make;

const configDiagram = (diagram:any) => {
  diagram.initialContentAlignment = go.Spot.Center;
  diagram.initialViewportSpot = go.Spot.Center;
  diagram.initialAutoScale = go.Diagram.Uniform;
  
  diagram.animationManager.initialAnimationStyle = go.AnimationManager.None;

  diagram.nodeTemplate = $(go.Node, "Auto",
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Panel, "Auto",
      $(go.Shape, 
        { 
          figure: "RoundedRectangle", cursor: "pointer", toLinkable: true,  fromLinkable: true,  portId: "", height: 80, 
        },
        new go.Binding("fill", "color"),
        new go.Binding("figure", "fig"),
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      ),
      $(go.Panel, "Vertical",
        $(go.TextBlock, { margin: 8, text: "Titulo", editable: true, stroke: "black", font: "bold 10pt sans-serif", textAlign: "center", width: 100,
        }, new go.Binding("text", "title").makeTwoWay()),
        $(go.TextBlock, { margin: 8,text: "Descripcion", editable: true, stroke: "black", font: "normal 8pt sans-serif", textAlign: "center", width: 100,
        }, new go.Binding("text", "description").makeTwoWay()),
      ),
    )
  );

  diagram.linkTemplate = $(go.Link, {
    curve: go.Link.JumpOver,
    routing: go.Link.AvoidsNodes,
    corner: 5,
    toShortLength: 4
  },$(go.Shape), $(go.Shape, { 
    toArrow: "Standard"
  }), $(go.Panel, "Auto", $(go.Shape, "Rectangle", { 
    fill: "#2149c000",
    stroke: "#2149c000"
  }), $(go.TextBlock, { 
    margin: 3, 
    editable: true, 
    text: 'descripcion',
  }, new go.Binding("text", "text").makeTwoWay())));

  diagram.groupTemplate =
  $(go.Group, "Vertical",
    { 
      selectionObjectName: "PH",
      locationObjectName: "PH",
      resizable: true,
      resizeObjectName: "PH",
    },
    {
      handlesDragDropForMembers: true,
      mouseDragEnter: function(e:any, grp:any, prev:any) {
        if (grp.canAddMembers(grp.diagram.selection)) {
          var shape = grp.findObject("SHAPE");
          if (shape) shape.fill = "green";
          grp.diagram.currentCursor = "";
        } else {
          grp.diagram.currentCursor = "acept";
        }
      },
      mouseDragLeave: function(e:any, grp:any, next:any) {
        var shape = grp.findObject("SHAPE");
        if (shape) shape.fill = "rgba(128,128,128,0.33)";
        grp.diagram.currentCursor = "";
      },
      mouseDrop: function(e:any, grp:any) {
        if (grp.canAddMembers(grp.diagram.selection)) {
          grp.addMembers(grp.diagram.selection, true);
        } else { 
          grp.diagram.currentTool.doCancel();
        }
      }
    },
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.TextBlock,  // group title
      { 
        font: "Bold 12pt Sans-Serif",
        editable: true,
      },
      new go.Binding("text", "title")),
    $(go.Shape,  // using a Shape instead of a Placeholder
      { name: "PH",
        fill: "lightyellow" },
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify))
  );
}

export {
  configDiagram
}