var ctx, doc, selection, page, view, artboard, artboards;

function stampArtboardName(context) {

  ctx = context;
  doc = context.document;
  selection = context.selection;
  page = [doc currentPage];
  view = [doc currentView];
  artboards = [[doc currentPage] artboards];

  var artboards = jsArray([doc artboards]);
  	for(var i = 0; i < artboards.length; i++) {
  	  	var artboard = artboards[i];

        //label underneath
        var x = 3;
        var y = 3;
        var w = artboard.name().length()*7;
        var h = 15;
        var path = NSBezierPath.bezierPath();
        path.moveToPoint(NSMakePoint(x, y));
        path.lineToPoint(NSMakePoint(x, y));
        path.lineToPoint(NSMakePoint(x + w, y));
        path.lineToPoint(NSMakePoint(x + w, y + h));
        path.lineToPoint(NSMakePoint(x, y + h));
        path.lineToPoint(NSMakePoint(x, y));
        path.closePath();
        var shape = MSShapeGroup.shapeWithBezierPath(path);
        shape.setName("Artboard_name_label");
        var fill = shape.style().fills().addNewStylePart();
        fill.color = MSColor.colorWithSVGString("#ffff00");
        artboard.addLayers([shape]);

        //artboard name
        var artboardName = artboard.addLayerOfType("text");
        artboardName.textColor = MSColor.colorWithSVGString("#727475");
        artboardName.fontSize = 12;
        artboardName.setFontPostscriptName("Arial");
        artboardName.setName("Artboard_name");
        artboardName.setNameIsFixed(true);
        artboardName.setStringValue(artboard.name());
        artboardName.frame().setX(5);
        artboardName.frame().setY(5);
        //artboardName.setIsLocked(true);
  	}
}

//get javascript array from NSArray
function jsArray(array) {
  var length = [array count];
  var jsArray = [];

  while(length--) {
  	jsArray.push([array objectAtIndex: length]);
  }
  return jsArray;
}

function hideArtboardNames(context) {

  ctx = context;
  doc = context.document;
  selection = context.selection;
  page = [doc currentPage];
  view = [doc currentView];
  artboards = [[doc currentPage] artboards];

  var artboards = jsArray([doc artboards]);
  	for(var i = 0; i < artboards.length; i++) {
  	  	var artboard = artboards[i];

        var all_layers = artboard.layers();
          for (x = 0; x < [all_layers count]; x++) {
            if (all_layers.objectAtIndex(x).name() == "Artboard_name" || all_layers.objectAtIndex(x).name() == "Artboard_name_label") {
              all_layers.objectAtIndex(x).setIsVisible(false);
          }
        }
  }
}

function showArtboardNames(context) {

  ctx = context;
  doc = context.document;
  selection = context.selection;
  page = [doc currentPage];
  view = [doc currentView];
  artboards = [[doc currentPage] artboards];

  var artboards = jsArray([doc artboards]);
  	for(var i = 0; i < artboards.length; i++) {
  	  	var artboard = artboards[i];

        var all_layers = artboard.layers();
          for (x = 0; x < [all_layers count]; x++) {
            if (all_layers.objectAtIndex(x).name() == "Artboard_name" || all_layers.objectAtIndex(x).name() == "Artboard_name_label") {
              all_layers.objectAtIndex(x).setIsVisible(true);
          }
        }
  }
}

// var onRun = function(context) {
//   ctx = context;
//   doc = context.document;
//   selection = context.selection;
//   page = [doc currentPage];
//   view = [doc currentView];
//   artboards = [[doc currentPage] artboards];
// };