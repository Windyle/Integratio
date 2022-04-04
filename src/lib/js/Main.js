"use strict";

// Import Dependencies
const { randomizeValue } = require("./lib/js/helpers/Randomizer");

// Event Listener for Initialization
document.addEventListener("DOMContentLoaded", init);

// Initialize main content
async function init() {
  // Initialize Actions Sub-Section
  console.info("- Initialize Actions");

  // Generate Buttons from actions array and append to actions section
  actions.forEach((action) => {
    let button = createElementFromHTML(`
    <div class="option" data-action="${action.id}" onclick="${action.onclick}">
      <div class="icon">
        <img alt="icon" src="../static/${action.icon}" />
      </div>
      <div class="text">
        <p>${action.text}</p>
      </div>
    </div>
    `);

    document.getElementById("treeview-dropdown").prepend(button);
  });

  // Initialize Search Bar
  console.info("- Initialize Search Bar");
  document.getElementById("search-container").style.display = "none";

  // Initialize Modals
  console.info("- Initialize Modals");
  document.getElementById("overlay").style.display = "none";
  document.getElementById("new-instance-modal").style.display = "none";
  document.getElementById("edit-instance-modal").style.display = "none";
  document.getElementById("delete-instance-modal").style.display = "none";

  // Initialize Loader
  console.info("- Initialize Loader");
  document.getElementById("loader-container").style.display = "none";

  // Initialize Tree View Dropdown
  console.info("- Initialize Tree View Dropdown");
  document.getElementById("treeview-dropdown").style.display = "none";

  // Initialize Tree View
  loadTreeView(await s_instances.generateInstancesList());

  console.log("- Initialize Main Content");
  document.getElementById("url-container").style.display = "none";
  document.getElementById("main-content-container").style.display = "none";
  showPostContainer();
  showGetContainer();

  // Initialize Post Bodies List Dropdown
  console.info("- Initialize Post Bodies List Dropdown");
  document.getElementById("post-body-dropdown").style.display = "none";

  setTimeout(() => {
    document.getElementById("splashscreen").remove();
  }, 2000);
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
    refreshPostBodiesList();
    document.getElementById("main-content-post").style.display = "grid";
  } else if (value === "") {
    document.getElementById("main-content-post").style.display = "none";
  } else {
    initBodyCodeEditor(value);
    refreshPostBodiesList();
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
  let current_body;

  try {
    current_body = JSON.parse(editor.getValue());
  } catch (e) {
    alert("The current content is not a valid JSON body!");
    return;
  }

  let random_body = {};

  Object.keys(current_body).forEach((key) => {
    let column = current_entity.columns.find((column) => column.name == key);
    if (column === undefined) return;

    random_body[key] = randomizeValue(column.type);
  });

  editor.setValue(JSON.stringify(random_body, null, 2));
}

// Function: Reset Current Entity's Body to blank for Post method
function resetCurrentEntityBody() {
  editor.setValue(s_instances.generateBlankBody(current_entity.columns));
}

// Function: Save Current Body for Post Method
async function savePostBody() {
  // Get title
  let title = document.getElementById("save-post-body-title-input").value;

  // Title must be provided
  if (title === undefined || title === "") {
    alert("Please provide a title for the body.");
    return;
  }

  // Get body from CodeMirror editor
  let body = editor.getValue();

  // Save Body
  await s_instances.saveBody(body, title, current_method_id);

  // Reset Title
  document.getElementById("save-post-body-title-input").value = "";

  refreshPostBodiesList();
}

// Function: Delete Post Body
async function deletePostBody() {
  await s_instances.deletePostBody(current_body_id);

  postBodyDropdownHide();
  refreshPostBodiesList();
}

// Function: Load Post Body
function loadPostBody(e) {
  // Retrieve node element
  let element = e.target;

  let nodeElement = element;
  // If nodeElement does not have an id then it's not a tree element, but a child of a tree element
  while (!nodeElement.hasAttribute("id") || !nodeElement.id.startsWith("body")) {
    nodeElement = nodeElement.parentElement;
  }

  editor.setValue(nodeElement.getAttribute("body-content"));
}

// Function: Post Bodies List Dropdown Menu from Right Click
function postBodyDropdownShow(e) {
  // Check if user pressed right mouse button
  if (e.button == 2) {
    // Retrieve node element
    let element = e.target;

    let nodeElement = element;
    // If nodeElement does not have an id then it's not a tree element, but a child of a tree element
    while (!nodeElement.hasAttribute("id") || !nodeElement.id.startsWith("body")) {
      nodeElement = nodeElement.parentElement;
    }

    current_body_id = nodeElement.id.split("-")[1];

    // Show dropdown with Edit and Delete options
    let dropdown = document.getElementById("post-body-dropdown");
    dropdown.style.display = "flex";
    dropdown.style.left = e.clientX / 1.005 + "px";
    dropdown.style.top = e.clientY / 1.005 + "px";
  }
}

function postBodyDropdownHide() {
  let dropdown = document.getElementById("post-body-dropdown");
  dropdown.style.display = "none";
}

// Function: Refresh Bodies List for Current Entity's Post Method
async function refreshPostBodiesList() {
  document.getElementById("post-bodies-list-content").innerHTML = "";

  let bodies = await s_instances.getPostBodies(current_method_id);

  bodies.forEach((body) => {
    let bodyRow = `<div class="body-row" id="body-${body.Id}" onmousedown="postBodyDropdownShow(event)" onclick="loadPostBody(event)" body-content='${body.Body}'>
      <p>${body.Title}</p>
    </div>`;

    document.getElementById("post-bodies-list-content").innerHTML += bodyRow;
  });
}
