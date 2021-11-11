import * as go from 'gojs';
const $ = go.GraphObject.make;

const KAPPA: number = 4 * ((Math.sqrt(2) - 1) / 3);

// Figuras
const actor = () => {
  
  go.Shape.defineFigureGenerator("Actor", function(shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, 0, false);
    geo.add(fig);

    var fig2 = new go.PathFigure(.335 * w, (1 - .555) * h, true);
    geo.add(fig2);
    // Shirt
    fig2.add(new go.PathSegment(go.PathSegment.Line, .335 * w, (1 - .405) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - .335) * w, (1 - .405) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - .335) * w, (1 - .555) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, w, .68 * h, (1 - .12) * w, .46 * h,
      (1 - .02) * w, .54 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, 0, h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, 0, .68 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, .335 * w, (1 - .555) * h, .02 * w, .54 * h,
      .12 * w, .46 * h));
    // Start of neck
    fig2.add(new go.PathSegment(go.PathSegment.Line, .365 * w, (1 - .595) * h));
    var radiushead = .5 - .285;
    var centerx = .5;
    var centery = radiushead;
    var alpha2 = Math.PI / 4;
    var KAPPA = ((4 * (1 - Math.cos(alpha2))) / (3 * Math.sin(alpha2)));
    var cpOffset = KAPPA * .5;
    var radiusw = radiushead;
    var radiush = radiushead;
    var offsetw = KAPPA * radiusw;
    var offseth = KAPPA * radiush;
    // Circle (head)
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (centerx - radiusw) * w, centery * h, (centerx - ((offsetw + radiusw) / 2)) * w, (centery + ((radiush + offseth) / 2)) * h,
      (centerx - radiusw) * w, (centery + offseth) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery - radiush) * h, (centerx - radiusw) * w, (centery - offseth) * h,
      (centerx - offsetw) * w, (centery - radiush) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (centerx + radiusw) * w, centery * h, (centerx + offsetw) * w, (centery - radiush) * h,
      (centerx + radiusw) * w, (centery - offseth) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (1 - .365) * w, (1 - .595) * h, (centerx + radiusw) * w, (centery + offseth) * h,
      (centerx + ((offsetw + radiusw) / 2)) * w, (centery + ((radiush + offseth) / 2)) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - .365) * w, (1 - .595) * h));
    // Neckline
    fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - .335) * w, (1 - .555) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - .335) * w, (1 - .405) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, .335 * w, (1 - .405) * h));
    var fig3 = new go.PathFigure(.2 * w, h, false);
    geo.add(fig3);
    // Arm lines
    fig3.add(new go.PathSegment(go.PathSegment.Line, .2 * w, .8 * h));
    var fig4 = new go.PathFigure(.8 * w, h, false);
    geo.add(fig4);
    fig4.add(new go.PathSegment(go.PathSegment.Line, .8 * w, .8 * h));
    return geo;
  });

}
const dataBase = () => {
  go.Shape.defineFigureGenerator("DataBase", function(shape, w, h) {
    var param1 = shape ? shape.parameter1 : NaN;  // half the height of the ellipse
    if (isNaN(param1)) param1 = 5; // default value
    param1 = Math.min(param1, h / 3);
  
    var geo = new go.Geometry();
    var cpxOffset = KAPPA * .5;
    var fig = new go.PathFigure(0, param1, true);
    geo.add(fig);
    // The base (top)
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, 0, 0, KAPPA * param1,
      (.5 - cpxOffset) * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, 1.0 * w, param1, (.5 + cpxOffset) * w, 0,
      1.0 * w, KAPPA * param1));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h - param1));
    // Bottom curve
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, 1.0 * h, 1.0 * w, h - KAPPA * param1,
      (.5 + cpxOffset) * w, 1.0 * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, h - param1, (.5 - cpxOffset) * w, 1.0 * h,
      0, h - KAPPA * param1));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, param1));
  
    var fig2 = new go.PathFigure(w, param1, false);
    geo.add(fig2);
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, 2 * param1, 1.0 * w, 2 * param1 - KAPPA * param1,
      (.5 + cpxOffset) * w, 2 * param1));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, 0, param1, (.5 - cpxOffset) * w, 2 * param1,
      0, 2 * param1 - KAPPA * param1));
  
    geo.spot1 = new go.Spot(0, 0, 0, 2 * param1);
    geo.spot2 = new go.Spot(1, 1);
    return geo;
  });
}
const contenido = () => {
  go.Shape.defineFigureGenerator("Contenido", function(shape, w, h) {
    var geo = new go.Geometry();
    var param1 = shape ? shape.parameter1 : NaN;
    // Distance of left  and right lines from edge
    if (isNaN(param1)) param1 = .1;
    var fig = new go.PathFigure(0, 0, true);
    geo.add(fig);
  
    fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
    var fig2 = new go.PathFigure((1 - param1) * w, 0, false);
    geo.add(fig2);
    fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - param1) * w, h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, param1 * w, 0));
    fig2.add(new go.PathSegment(go.PathSegment.Line, param1 * w, h));
    //??? geo.spot1 = new go.Spot(param1, 0);
    //??? geo.spot2 = new go.Spot(1 - param1, 1);
    return geo;
  });
}
const appWeb = () => {
  go.Shape.defineFigureGenerator("AppWeb", function(shape, w, h) {
    var geo = new go.Geometry();
    var param1 = shape ? shape.parameter1 : NaN;
    if (isNaN(param1) || param1 < .1) param1 = .1; // Minimum
    var fig = new go.PathFigure(0, 0, true);
    geo.add(fig);
  
    fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
    var fig2 = new go.PathFigure(0, param1 * h, false);
    geo.add(fig2);
    fig2.add(new go.PathSegment(go.PathSegment.Line, w, param1 * h));
    //??? geo.spot1 = new go.Spot(0, param1);
    //??? geo.spot2 = go.Spot.BottomRight;
    return geo;
  });
}
const appMovil = () => {
  go.Shape.defineFigureGenerator("AppMovil", function(shape, w, h) {
    var geo = new go.Geometry();
    var param1 = shape ? shape.parameter1 : NaN;
    if (isNaN(param1)) param1 = .2;
    else if (param1 < .15) param1 = .15; // Minimum
    var cpOffset = KAPPA * .2;
    var fig = new go.PathFigure(0, .2 * h, true);
    geo.add(fig);
  
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .2 * w, 0, 0, (.2 - cpOffset) * h,
      (.2 - cpOffset) * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, .8 * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, w, .2 * h, (.8 + cpOffset) * w, 0,
      w, (.2 - cpOffset) * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, .8 * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .8 * w, h, w, (.8 + cpOffset) * h,
      (.8 + cpOffset) * w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, .2 * w, h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, .8 * h, (.2 - cpOffset) * w, h,
      0, (.8 + cpOffset) * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, .2 * h));
    var fig2 = new go.PathFigure(0, param1 * h, false);
    geo.add(fig2);
    fig2.add(new go.PathSegment(go.PathSegment.Line, w, param1 * h));
    //??? geo.spot1 = new go.Spot(0, param1);
    //??? geo.spot2 = new go.Spot(1, 1 - param1);
    return geo;
  });    
}

export {
  actor,
  appMovil,
  appWeb,
  contenido,
  dataBase,
}