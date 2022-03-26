"use strict";

// TEST

// Event Listener for Initialization
document.addEventListener("DOMContentLoaded", init);

// Initialize the nav
function init() {
  console.log("Initializing code editor");

  var codeMirrorOptions = {
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
    theme: "cobalt",
    json: true,
  };

  var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("body-showcase"), codeMirrorOptions);

  myCodeMirror.setSize("95%", "95%");
}
