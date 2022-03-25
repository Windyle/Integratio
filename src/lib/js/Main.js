"use strict";

// Import Modules:
// Libraries
const monaco = require("monaco-editor");

// TEST
// Event Listener for Initialization
document.addEventListener("DOMContentLoaded", init);

// Initialize the nav
function init() {
  monaco.editor.create(document.getElementById("body-showcase"), {
    value: "function hello() {\n\talert('Hello world!');\n}",
    language: "javascript",
  });
}
