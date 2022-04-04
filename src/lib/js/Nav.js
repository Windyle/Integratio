"use strict";

// Import Modules:
// Instances Service
const s_instances = require("./lib/js/Instances.Module");
// Libraries
const { ipcRenderer } = require("electron");

// Action Buttons Declaration
const actions = [
  { id: "export-postman", text: "Export to Postman", onclick: "", icon: "postman.svg" },
  { id: "export-structure", text: "Export Data Structure", onclick: "", icon: "book.svg" },
];

// Event Listener for Initialization
document.addEventListener("DOMContentLoaded", init);

// Initialize the nav
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
  showLoader();
  loadTreeView(await s_instances.generateInstancesList());
  showLoader();
}

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
    // Show dropdown with Edit and Delete options
    let dropdown = document.getElementById("treeview-dropdown");
    dropdown.style.display = "flex";
    dropdown.style.left = e.clientX + "px";
    dropdown.style.top = e.clientY / 1.2 + "px";

    // Retrieve node element
    let element = e.target;

    let nodeElement = element;
    // If nodeElement does not have an id then it's not a tree element, but a child of a tree element
    while (!nodeElement.hasAttribute("id")) {
      nodeElement = nodeElement.parentElement;
    }

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
