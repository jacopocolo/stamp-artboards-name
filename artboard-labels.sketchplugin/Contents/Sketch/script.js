//Let's import the library that allows us to talk with the UI
@import "preferences.js";

// let's get a hold on the Sketch API
const sketch = require('sketch');
//let's expose these globally
var document;
var page;
var Rectangle = require('sketch/dom').Rectangle;
var Shape = require('sketch/dom').Shape;
var Style = require('sketch/dom').Style;
var Group = require('sketch/dom').Group;

function generateLabels(context) {
  deleteLabels(context);
  document = sketch.fromNative(context.document);
  page = document.selectedPage;

  for (x=0;x<page.layers.length;x++) {
    if (page.layers[x].type == 'Artboard') {

      const label = new Shape({
        name: "rectMask",
        parent: page.layers[x],
        frame: new Rectangle(0, 0, 10, 10),
        style: {
          fills: [labelColor],
          borders: [{enabled:false}]
        }
      })

      const text = new sketch.Text({
        parent: page.layers[x],
        text: page.layers[x].name,
        frame: new Rectangle(padding, padding, 10, 10),
        name: 'Artboard_name_label'
      });
      
      text.style.fontSize = textSize;
      text.style.fontFamily = fontFamily;
      text.style.textColor = textColor;
      text.adjustToFit();
      label.frame.width = text.frame.width+padding+padding;
      label.frame.height = text.frame.height+padding+padding;
      
      new Group();
    
      var group = new Group({
        name: 'Artboard_label',
        parent: page.layers[x],
        locked: true
      })

      group.frame.width = label.frame.width;
      group.frame.height = label.frame.height;

      group.layers.push(label);
      group.layers.push(text);

    }
  }
}

function hideLabels(context) {
    document = sketch.fromNative(context.document);
    page = document.selectedPage;

    for (x=0;x<page.layers.length;x++) {
      if (page.layers[x].type == 'Artboard') {
        for (y=0;y<page.layers[x].layers.length;y++){
        if (page.layers[x].layers[y].type == 'Group' && page.layers[x].layers[y].name == "Artboard_label")
        page.layers[x].layers[y].hidden = true;
        }
    }
  }
}

function showLabels(context) {
  document = sketch.fromNative(context.document);
  page = document.selectedPage;

    for (x=0;x<page.layers.length;x++) {
      if (page.layers[x].type == 'Artboard') {
        for (y=0;y<page.layers[x].layers.length;y++){
        if (page.layers[x].layers[y].type == 'Group' && page.layers[x].layers[y].name == "Artboard_label")
        page.layers[x].layers[y].hidden = false;
        }
    }
  }
}

function updateLabels(context) {
  document = sketch.fromNative(context.document);
  page = document.selectedPage;

    for (x=0;x<page.layers.length;x++) {
      if (page.layers[x].type == 'Artboard') {
        for (y=0;y<page.layers[x].layers.length;y++){
        if (page.layers[x].layers[y].type == 'Group' && page.layers[x].layers[y].name == "Artboard_label")
        var label = page.layers[x].layers[y].layers[0];
        var text = page.layers[x].layers[y].layers[1];
        text.text = page.layers[x].name;
        label.frame.width = text.frame.width;
        label.frame.height = text.frame.height;
        }
    }
  }
}

function deleteLabels(context) {
  document = sketch.fromNative(context.document);
  page = document.selectedPage;

  for (x=0;x<page.layers.length;x++) {
      if (page.layers[x].type == 'Artboard') {
        for (y=0;y<page.layers[x].layers.length;y++){
        if (page.layers[x].layers[y].type == 'Group' && page.layers[x].layers[y].name == "Artboard_label")
        page.layers[x].layers[y].remove();
        }
    }
  }
}

function editPreferences() {
  path = MSPluginManager.mainPluginsFolderURL().path() + '/artboard-labels.sketchplugin/Contents/Sketch/preferences.js'
  [[NSWorkspace sharedWorkspace] openFile:path withApplication:@"Textedit"];
}