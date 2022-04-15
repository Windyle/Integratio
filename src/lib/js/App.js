"use strict";

// Import Modules:
// Instances Service
const s_instances = require("./lib/js/Instances.Module");
// Libraries
const { ipcRenderer } = require("electron");
const { randomizeValue } = require("./lib/js/helpers/Randomizer");

// Process Variables
let current_instance;
let current_entity_id;
let current_entity;
let current_method_id;
let current_body_id;

// CodeMirror
let editor;

// Action Buttons Declaration
const actions = [
  { id: "export-postman", text: "Export to Postman", onclick: "", icon: "postman.svg" },
  { id: "export-structure", text: "Export Data Structure", onclick: "", icon: "book.svg" },
];

// Window Actions Functions
function closeWindow() {
  ipcRenderer.send("close-app");
}

function maximizeWindow() {
  ipcRenderer.send("maximize-app");
}

function minimizeWindow() {
  ipcRenderer.send("minimize-app");
}

// Function: Open Issue Page on Help Button click
function openIssuePage() {
  require("electron").shell.openExternal("https://github.com/Windyle/Integratio/issues");
}

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

// Function: Show / Hide Search Bar
function showSearchBar() {
  if (document.getElementById("search-container").style.display == "none") {
    document.getElementById("search-container").style.display = "flex";
  } else {
    document.getElementById("search-container").style.display = "none";
  }
}

// Function: Show / Hide New Instance Modal
function showNewInstanceModal() {
  if (document.getElementById("new-instance-modal").style.display == "none") {
    document.getElementById("new-instance-modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  } else {
    document.getElementById("new-instance-modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("new-instance-name").value = "";
    document.getElementById("new-instance-url").value = "";
  }
}

// Function: Show / Hide Edit Instance Modal
function showEditInstanceModal() {
  if (document.getElementById("edit-instance-modal").style.display == "none") {
    document.getElementById("edit-instance-modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";

    let instance = s_instances.getInstanceInfo(current_instance);

    document.getElementById("edit-instance-name").value = instance.name;
    document.getElementById("edit-instance-url").value = instance.path.split("/Terrasoft.WebApp")[0];
  } else {
    document.getElementById("edit-instance-modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("edit-instance-name").value = "";
    document.getElementById("edit-instance-url").value = "";
  }
}

// Function: Show / Hide Delete Instance Modal
function showDeleteInstanceModal() {
  if (document.getElementById("delete-instance-modal").style.display == "none") {
    document.getElementById("delete-instance-modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  } else {
    document.getElementById("delete-instance-modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
}

// Function: Show / Hide Loader
function showLoader() {
  if (document.getElementById("loader-container").style.display == "none") {
    document.getElementById("loader-container").style.display = "flex";
  } else {
    document.getElementById("loader-container").style.display = "none";
  }
}

// Function: Treeview Dropdown Menu from Right Click
function treeviewDropdownShow(e) {
  // Check if user pressed right mouse button
  if (e.button == 2) {
    // Retrieve node element
    let element = e.target;

    if (element.hasAttribute("id") && element.id.includes(".")) return;

    let nodeElement = element;
    // If nodeElement does not have an id then it's not a tree element, but a child of a tree element
    while (!nodeElement.hasAttribute("id")) {
      nodeElement = nodeElement.parentElement;
      if (nodeElement.id.includes(".")) {
        nodeElement = null;
        return;
      }
    }

    if (nodeElement == null) return;

    // Show dropdown with Edit and Delete options
    let dropdown = document.getElementById("treeview-dropdown");
    dropdown.style.display = "flex";
    dropdown.style.left = e.clientX / 1.1 + "px";
    dropdown.style.top = e.clientY / 1.5 + "px";

    // Set current instance
    setCurrentInstance(nodeElement.id);
  }
}

function treeviewDropdownHide(e) {
  let dropdown = document.getElementById("treeview-dropdown");
  dropdown.style.display = "none";
}

// Function: Set Current Instance
function setCurrentInstance(instanceId) {
  current_instance = instanceId;

  // Get Instance Name
  let instanceName = document.getElementById(instanceId).children[0].children[1].innerText;

  // Toggle expand for other instances
  let treeview = document.getElementById("treeview-content");
  for (let i = 0; i < treeview.children.length; i++) {
    if (treeview.children[i].id != instanceId) {
      // Toggle expand to chevron
      treeview.children[i].children[0].children[0].classList.remove("expanded");
      // Add class to hide children
      for (let j = 1; j < treeview.children[i].children.length; j++) {
        treeview.children[i].children[j].classList.add("hide");
      }
    }
  }

  // Enable Actions
  let actions = [];

  enableActions(actions);
}

// Function: Enable Action Buttons
function enableActions(actions) {
  actions.forEach((id) => {
    document.getElementById(id).classList.remove("disabled");
  });
}

// Function: Load Tree View
function loadTreeView(instances) {
  console.info("- Load Tree View");
  // Emtpying Tree View
  document.getElementById("treeview-content").innerHTML = "";

  instances.forEach((instance) => {
    /**
     * Instance Container
     *
     * @param {string} instance.id - Instance ID
     * @param {string} instance.text - Instance Name
     */
    let instanceNode = `<div id="${instance.id}" class="root" onmousedown="treeviewDropdownShow(event)" >
        <div class="text-container" onclick="expand(event)">
          <div class="chevron"></div>
          <p>${instance.text}</p>
        </div>
      </div>`;

    document.getElementById("treeview-content").innerHTML += instanceNode;

    instance.packages.forEach((current_package) => {
      /**
       * Package Container
       *
       * @param {string} current_package.id - Package ID
       * @param {string} current_package.text - Package Name
       */
      let packageNode = `<div id="${instance.id}.${current_package.id}" class="package hide">
          <div class="text-container" onclick="expand(event)">
            <div class="chevron"></div>
            <p>${current_package.text}</p>
          </div>
        </div>`;

      document.getElementById(instance.id).innerHTML += packageNode;

      current_package.entities.forEach((entity) => {
        /**
         * Entity Container
         *
         * @param {string} entity.id - Entity ID
         * @param {string} entity.text - Entity Name
         */
        let entityNode = `<div id="${instance.id}.${current_package.id}.${entity.id}" class="entity hide">
            <div class="text-container" onclick="expand(event)">
              <div class="chevron"></div>
              <p>${entity.text}</p>
            </div>
          </div>`;

        document.getElementById(instance.id + "." + current_package.id).innerHTML += entityNode;

        entity.methods.forEach((method) => {
          /**
           * Method Container
           *
           * @param {string} method.id - Method ID
           * @param {string} method.type - Method Type
           */
          let methodNode = `<div id="${instance.id}.${current_package.id}.${entity.id}.${
            method.id
          }" class="method hide" onclick="methodRoute('${method.type}', ${instance.id}, ${current_package.id}, ${
            entity.id
          })">
              <div class="circle"></div>
              <p class=${method.type.toLowerCase()}>${method.type}</p>
            </div>`;

          document.getElementById(instance.id + "." + current_package.id + "." + entity.id).innerHTML += methodNode;
        });
      });
    });
  });
}

// Function: Expand / Collapse Tree View
function expand(e) {
  if (e.button == 0) {
    let element = e.target;
    let parent = element.parentElement;

    let nodeElement = element;
    // If nodeElement does not have an id then it's not a tree element, but a child of a tree element
    while (!nodeElement.hasAttribute("id")) {
      nodeElement = nodeElement.parentElement;
    }

    // If element is an instance node then set current instance
    if (nodeElement.classList.contains("root")) {
      setCurrentInstance(nodeElement.id);
    }

    // Children[0] is the chevron, Children[1-X] are the sub-elements
    nodeElement.children[0].children[0].classList.toggle("expanded");
    for (let i = 1; i < nodeElement.children.length; i++) {
      nodeElement.children[i].classList.toggle("hide");
    }
  }
}

// Function: Add New Instance
async function addNewInstance() {
  let instanceName = document.getElementById("new-instance-name").value;
  let instanceUrl = document.getElementById("new-instance-url").value;

  if (instanceName === "" || instanceUrl === "") {
    alert("Please fill in all fields");
    return;
  }

  if (s_instances.getInstances().findIndex((instance) => instance.text == instanceName) != -1) {
    alert("An instance with the provided name already exists");
    return;
  }

  // Check that the instance path is a valid Creatio root path
  let pkgPath = s_instances.validatePath(instanceUrl);

  if (pkgPath == "") {
    alert("Invalid Instance Path");
    return;
  }

  // Load here the packages list in order to get a cleaner loadTreeView function
  let pkgList = s_instances.loadPackagesList(pkgPath);

  // Hide Modal and Show Loader
  showNewInstanceModal();
  showLoader();

  // Add Instance to Instances DB and reload the TreeView
  await s_instances.addInstanceToDB(instanceName, pkgPath, pkgList);

  loadTreeView(await s_instances.generateInstancesList());

  // Hide Loader
  showLoader();
}

// Function: Delete Instance
async function deleteInstance() {
  // Hide Modal and Show Loader
  showDeleteInstanceModal();
  showLoader();

  // Delete Instance from DB and reload the TreeView
  await s_instances.deleteInstanceFromDB(current_instance);

  loadTreeView(await s_instances.generateInstancesList());

  // Hide Loader
  showLoader();
}

// Function: Edit Instance Info
async function editInstance() {
  let new_name = document.getElementById("edit-instance-name").value;
  let new_path = document.getElementById("edit-instance-url").value;

  if (new_name === "" || new_path === "") {
    alert("Please fill in all fields");
    return;
  }

  if (s_instances.getInstances().findIndex((instance) => instance.text == new_name) != -1) {
    alert("An instance with the provided name already exists");
    return;
  }

  // Check that the instance path is a valid Creatio root path
  let pkgPath = s_instances.validatePath(new_path);

  if (pkgPath == "") {
    alert("Invalid Instance Path");
    return;
  }

  // Hide Modal and Show Loader
  showEditInstanceModal();
  showLoader();

  await s_instances.editInstance(current_instance, new_name, pkgPath);

  document.getElementById(current_instance).children[0].children[1].innerHTML = new_name;

  // Hide Loader
  showLoader();
}

/**
 * Method Route
 *
 * @param {string} type // GET, POST, PATCH, DELETE
 * @param {string} instanceId
 * @param {string} packageId
 * @param {string} entityId
 */
function methodRoute(type, instanceId, packageId, entityId) {
  showUrlContainer();
  showMainContentContainer();

  switch (type) {
    case "GET":
      break;
    case "POST":
      if (document.getElementById("main-content-post").style.display == "grid" && entityId === current_entity_id)
        return;

      current_entity_id = entityId;
      current_entity = s_instances.getEntity(instanceId, packageId, entityId);
      current_method_id = s_instances.getMethodId(instanceId, packageId, entityId, "POST");
      setUrlContainerValue(current_entity.name);
      showPostContainer(s_instances.generateBlankBody(current_entity.columns));
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
  }
}

// Create element from html for prepending actions
function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
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
