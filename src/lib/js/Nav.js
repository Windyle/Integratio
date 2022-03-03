"use strict";

let s_instances = require("./lib/js/Instances.Module");

/**
 * Action Buttons Declaration
 */
const actions = [
  { id: "sync", text: "SYNC WITH PACKAGE" },
  { id: "export-postman", text: "EXPORT FOR POSTMAN" },
  { id: "random-fill", text: "RANDOM BODY FILLER" },
  { id: "export-structure", text: "EXPORT DATA STRUCTURE" },
];

// Event Listener for Initialization
document.addEventListener("DOMContentLoaded", init);

// Initialize the nav
function init() {
  // Initialize Actions Sub-Section
  console.info("- Initialize Actions");

  actions.forEach((action) => {
    let button =
      '<div id="' +
      action.id +
      '" class="button disabled">' +
      action.text +
      "</div>";

    document.getElementById("actions").innerHTML += button;
  });

  // Initialize Search Bar
  console.info("- Initialize Search Bar");
  document.getElementById("search-container").style.display = "none";

  // Initialize New Instance Modal
  console.info("- Initialize New Instance Modal");
  document.getElementById("new-instance-modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";

  // Initialize Tree View

  loadTreeView(s_instances.getInstancesList());
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
  }
}

// Function: Load Tree View
function loadTreeView(instances) {
  console.info("- Load Tree View");
  document.getElementById("treeview-content").innerHTML = "";

  instances.forEach((instance) => {
    let instanceNode = `<div id="${instance.id}" class="root">
        <div class="text-container" onclick="expand(event)">
          <div class="chevron"></div>
          <p>${instance.text}</p>
        </div>
      </div>`;

    document.getElementById("treeview-content").innerHTML += instanceNode;

    instance.packages.forEach((current_package) => {
      let packageNode = `<div id="${instance.id}${current_package.id}" class="package hide">
          <div class="text-container" onclick="expand(event)">
            <div class="chevron"></div>
            <p>${current_package.text}</p>
          </div>
        </div>`;

      document.getElementById(instance.id).innerHTML += packageNode;

      current_package.entities.forEach((entity) => {
        let entityNode = `<div id="${instance.id}${current_package.id}${entity.id}" class="entity hide">
            <div class="text-container" onclick="expand(event)">
              <div class="chevron"></div>
              <p>${entity.id}</p>
            </div>
          </div>`;

        document.getElementById(instance.id + current_package.id).innerHTML +=
          entityNode;

        entity.methods.forEach((method) => {
          let methodNode = `<div id="${instance.id}${current_package.id}${
            entity.id
          }${method.id}" class="method hide">
              <div class="circle"></div>
              <p class=${method.text.toLowerCase()}>${method.text}</p>
            </div>`;

          document.getElementById(
            instance.id + current_package.id + entity.id
          ).innerHTML += methodNode;
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
  while (!usedElement.hasAttribute("id")) {
    usedElement = usedElement.parentElement;
  }

  usedElement.children[0].children[0].classList.toggle("expanded");
  for (let i = 1; i < usedElement.children.length; i++) {
    usedElement.children[i].classList.toggle("hide");
  }
}

// Function: Add New Instance
function addNewInstance() {
  let instanceName = document.getElementById("new-instance-name").value;
  let instanceUrl = document.getElementById("new-instance-url").value;

  if (instanceName === "" || instanceUrl === "") {
    alert("Please fill in all fields");
    return;
  }

  let pkgPath = s_instances.validatePath(instanceUrl);

  if (pkgPath == "") {
    alert("Invalid Package Path");
    return;
  }

  let pkgList = s_instances.loadPackagesList(pkgPath);

  loadTreeView(s_instances.addInstanceToList(instanceName, pkgPath, pkgList));

  showNewInstanceModal();
}
