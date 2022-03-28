"use strict";

// Event Listener for Initialization
document.addEventListener("DOMContentLoaded", init);

// Initialize main content
function init() {
  console.log("- Initialize Main Content");
  showUrlContainer();
  showMainContentContainer();
  showPostContainer();
  showGetContainer();
}

// Function: Show Url Container
function showUrlContainer() {
  if (document.getElementById("url-container").style.display == "none") {
    document.getElementById("main-placeholder-icon").style.display = "none";
    document.getElementById("url-container").style.display = "flex";
  } else {
    document.getElementById("url-container").style.display = "none";
  }
}

// Function: Show Main Content Container
function showMainContentContainer() {
  if (document.getElementById("main-content-container").style.display == "none") {
    document.getElementById("main-content-container").style.display = "flex";
  } else {
    document.getElementById("main-content-container").style.display = "none";
  }
}

// Function: Show Post Container
function showPostContainer() {
  if (document.getElementById("post-container").style.display == "none") {
    document.getElementById("post-container").style.display = "flex";
  } else {
    document.getElementById("post-container").style.display = "none";
  }
}

// Function: Show Get Container
function showGetContainer() {
  if (document.getElementById("get-container").style.display == "none") {
    document.getElementById("get-container").style.display = "flex";
  } else {
    document.getElementById("get-container").style.display = "none";
  }
}

// Function: Initialize Body Code Editor
function initBodyCodeEditor() {
  var codeMirrorOptions = {
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
    theme: "integratio",
    json: true,
  };

  var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("body-showcase"), codeMirrorOptions);

  myCodeMirror.setSize("95%", "85%");
}
