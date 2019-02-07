//Let's import the library that allows us to talk with the UI
@import "MochaJSDelegate.js";

// let's get a hold on the Sketch API
const sketch = require('sketch');
//let's expose these globally
var document;
var page;
var Rectangle = require('sketch/dom').Rectangle;
var Shape = require('sketch/dom').Shape;
var Style = require('sketch/dom').Style;
var Group = require('sketch/dom').Group;

//Stamps settings
labelColor = "#ffff00";
textColor = "#0000ff";
textSize = 12;

function addLabels(context) {
    document = sketch.fromNative(context.document);
    page = document.selectedPage;

    for (x=0;x<page.layers.length;x++) {
      if (page.layers[x].type == 'Artboard') {

        const label = new Shape({
          name: "rectMask",
          parent: page.layers[x],
          frame: new Rectangle(0, 0, 100, 100),
          style: {
            fills: [labelColor],
            borders: [{enabled:false}]
          }
        })
      
        const text = new sketch.Text({
          parent: page.layers[x],
          sytle: {
            fills: [textColor],
          },
          text: page.layers[x].name,
          frame: new Rectangle(0,0, 100, 100),
          name: 'Artboard_name_label'
        });
      
        text.systemFontSize = textSize;
        label.frame.width = text.frame.width;
        label.frame.height = text.frame.height;
      
        new Group();
      
        var group = new Group({
          name: 'Artboard_label',
          layers: [label, text],
          parent: page.layers[x],
          locked: true
        })
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
