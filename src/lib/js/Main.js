"use strict";

// Import Dependencies
const { randomizeValue } = require("./lib/js/helpers/Randomizer");

// Event Listener for Initialization
document.addEventListener("DOMContentLoaded", init);

// Initialize main content
function init() {
  console.log("- Initialize Main Content");
  document.getElementById("url-container").style.display = "none";
  document.getElementById("main-content-container").style.display = "none";
  showPostContainer();
  showGetContainer();
}

// Function: Show Url Container
function showUrlContainer() {
  if (document.getElementById("url-container").style.display == "none") {
    document.getElementById("main-placeholder-icon").style.display = "none";
    document.getElementById("url-container").style.display = "flex";
  }
}

// Function: Show Main Content Container
function showMainContentContainer() {
  if (document.getElementById("main-content-container").style.display == "none") {
    document.getElementById("main-content-container").style.display = "flex";
  }
}

// Function: Show Post Container
function showPostContainer(value = "") {
  if (document.getElementById("main-content-post").style.display == "none") {
    initBodyCodeEditor(value);
    document.getElementById("main-content-post").style.display = "grid";
  } else if (value === "") {
    document.getElementById("main-content-post").style.display = "none";
  } else {
    initBodyCodeEditor(value);
  }
}

// Function: Show Get Container
function showGetContainer() {
  if (document.getElementById("main-content-get").style.display == "none") {
    document.getElementById("main-content-get").style.display = "flex";
  } else {
    document.getElementById("main-content-get").style.display = "none";
  }
}

// Function: Set Url Container's value
function setUrlContainerValue(entity) {
  document.getElementById("url-showcase").value = "{{Host}}/0/odata/" + entity;
}

// Function: Initialize Body Code Editor
async function initBodyCodeEditor(value = "") {
  if (document.getElementsByClassName("CodeMirror")[0] !== undefined)
    document.getElementsByClassName("CodeMirror")[0].remove();

  var codeMirrorOptions = {
    mode: "application/ld+json",
    lineNumbers: true,
    lineWrapping: true,
    theme: "dracula",
  };

  editor = await CodeMirror.fromTextArea(document.getElementById("body-showcase"), codeMirrorOptions);
  editor.setValue(value);
  editor.setSize("95%", "85%");
}

// Function: Randomize Current Entity's Body
function randomizeCurrentEntityBody() {
  let current_body = JSON.parse(editor.getValue());
  let random_body = {};

  Object.keys(current_body).forEach((key) => {
    let column = current_entity.columns.find((column) => column.name == key);
    if (column === undefined) return;

    random_body[key] = randomizeValue(column.type);
  });

  editor.setValue(JSON.stringify(random_body, null, 2));
}
