"use strict";

// Import Module: Instance Manager
let s_instances = require("./lib/js/Instances.Module");

// Action Buttons Declaration
const actions = [
  { id: "sync", text: "SYNC WITH PACKAGE" },
  { id: "export-postman", text: "EXPORT FOR POSTMAN" },
  { id: "random-fill", text: "RANDOM BODY FILLER" },
  { id: "export-structure", text: "EXPORT DATA STRUCTURE" },
  { id: "body-type-compare", text: "BODY TYPE COMPARE" },
];

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
  }
}

function treeviewDropdownHide(e) {
  // Check if user pressed right mouse button
  // if (e.button == 2 || e.type == "mouseleave") {
  // Show dropdown with Edit and Delete options
  let dropdown = document.getElementById("treeview-dropdown");
  dropdown.style.display = "none";
  // }
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

  let usedElement = element;
  // If usedElement does not have an id then it's not a tree element, but a child of a tree element
  while (!usedElement.hasAttribute("id")) {
    usedElement = usedElement.parentElement;
  }

  // Children[0] is the chevron, Children[1-X] are the sub-elements
  usedElement.children[0].children[0].classList.toggle("expanded");
  for (let i = 1; i < usedElement.children.length; i++) {
    usedElement.children[i].classList.toggle("hide");
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

  showNewInstanceModal();
  showLoader();
  await s_instances.addInstanceToDB(instanceName, pkgPath, pkgList);

  loadTreeView(await s_instances.generateInstancesList());
  showLoader();
}
