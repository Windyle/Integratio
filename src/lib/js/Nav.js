"use strict";

// Import Module: Instance Manager
let s_instances = require("./lib/js/Instances.Module");

// Action Buttons Declaration
const actions = [
  { id: "sync", text: "SYNC INSTANCE" },
  { id: "random-fill", text: "RANDOM BODY FILLER" },
  { id: "body-type-compare", text: "BODY VALIDATOR" },
  { id: "export-postman", text: "EXPORT FOR POSTMAN" },
  { id: "export-structure", text: "EXPORT DATA STRUCTURE" },
];

// Process Variables
let current_instance;

// Event Listener for Initialization
document.addEventListener("DOMContentLoaded", init);

// Initialize the nav
async function init() {
  // Initialize Actions Sub-Section
  console.info("- Initialize Actions");

  // Generate Buttons from actions array and append to actions section
  actions.forEach((action) => {
    let button = `<div id="${action.id}" class="button disabled">${action.text}</div>`;

    document.getElementById("actions").innerHTML += button;
  });

  // Initialize Search Bar
  console.info("- Initialize Search Bar");
  document.getElementById("search-container").style.display = "none";

  // Initialize Modals
  console.info("- Initialize Modals");
  document.getElementById("overlay").style.display = "none";
  document.getElementById("new-instance-modal").style.display = "none";
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
    dropdown.style.display = "block";
    dropdown.style.left = e.clientX / 1.5 + "px";
    dropdown.style.top = e.clientY / 1.1 + "px";

    // Set current instance
    setCurrentInstance(e.target.id);
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
  let instanceName = document.getElementById(instanceId).innerText;

  // Update instance display in header
  document.getElementById("instance-display").innerHTML = instanceName;

  // Toggle expand for other instances
  let treeview = document.getElementById("treeview-content");
  for (let i = 0; i < treeview.children.length; i++) {
    if (treeview.children[i].id != instanceId) {
      treeview.children[i].children[0].children[0].classList.remove("expanded");
      for (let j = 1; j < treeview.children[i].children.length; j++) {
        treeview.children[i].children[j].classList.add("hide");
      }
    }
  }
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
          }" class="method hide">
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
    alert("Invalid Package Path");
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
async function deleteInstance(instanceId) {
  // Show Loader
  showLoader();

  // Delete Instance from DB and reload the TreeView
  await s_instances.deleteInstanceFromDB(instanceId);

  loadTreeView(await s_instances.generateInstancesList());

  // Hide Loader
  showLoader();
}
