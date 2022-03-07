"use strict";

// Import Modules
const fs = require("fs");

// TEST DATA
let instances = [
  {
    id: "1",
    text: "Account Test",
    packages: [
      {
        id: "1",
        text: "Tst",
        entities: [
          {
            id: "1",
            text: "Account",
            methods: [
              {
                id: "1",
                type: "GET",
              },
              {
                id: "2",
                type: "POST",
              },
              {
                id: "3",
                type: "PATCH",
              },
              {
                id: "4",
                type: "DELETE",
              },
            ],
          },
          {
            id: "2",
            text: "tstDetailDiscounts",
            methods: [
              {
                id: "5",
                type: "GET",
              },
              {
                id: "6",
                type: "POST",
              },
              {
                id: "7",
                type: "PATCH",
              },
              {
                id: "8",
                type: "DELETE",
              },
            ],
          },
          {
            id: "3",
            text: "tstDetailAccountBillingInfo",
            methods: [
              {
                id: "9",
                type: "GET",
              },
              {
                id: "10",
                type: "POST",
              },
              {
                id: "11",
                type: "PATCH",
              },
              {
                id: "12",
                type: "DELETE",
              },
            ],
          },
        ],
      },
    ],
  },
];

module.exports = {
  getInstancesList: () => {
    return instances;
  },
  addInstanceToList: (name, path, pkgs) => {
    instances.push({
      id: name.replace(/\s/g, "").toLowerCase(),
      text: name,
      expanded: false,
      packages: [],
    });

    pkgs.forEach((pkg) => {
      instances[instances.length - 1].packages.push({
        id: pkg
          .replace(/\s/g, "")
          .replace(/[.,-/()]/g, "")
          .toLowerCase(),
        text: pkg,
        expanded: false,
        entities: [],
      });

      let entities = fs.readdirSync(path + "/" + pkg + "/Schemas");

      entities.forEach((entity) => {
        let descriptorFile = fs
          .readFileSync(`${path}/${pkg}/Schemas/${entity}/descriptor.json`)
          .toString();
        descriptorFile = descriptorFile.slice(1, descriptorFile.length);

        let descriptorJson = JSON.parse(descriptorFile);

        if (
          descriptorJson.Descriptor.ManagerName === "EntitySchemaManager" &&
          (descriptorJson.Descriptor.Parent.Name === "BaseEntity" ||
            descriptorJson.Descriptor.Parent.Name ===
              descriptorJson.Descriptor.Name)
        ) {
          instances[instances.length - 1].packages[
            instances[instances.length - 1].packages.length - 1
          ].entities.push({
            id: entity,
            expanded: false,
            methods: [
              {
                id:
                  pkg
                    .replace(/\s/g, "")
                    .replace(/[.,-/()]/g, "")
                    .toLowerCase() +
                  "get" +
                  entity,
                type: "GET",
              },
              {
                id:
                  pkg
                    .replace(/\s/g, "")
                    .replace(/[.,-/()]/g, "")
                    .toLowerCase() +
                  "post" +
                  entity,
                type: "POST",
              },
              {
                id:
                  pkg
                    .replace(/\s/g, "")
                    .replace(/[.,-/()]/g, "")
                    .toLowerCase() +
                  "patch" +
                  entity,
                type: "PATCH",
              },
              {
                id:
                  pkg
                    .replace(/\s/g, "")
                    .replace(/[.,-/()]/g, "")
                    .toLowerCase() +
                  "delete" +
                  entity,
                type: "DELETE",
              },
            ],
            columns: [],
          });

          let metadataFile = fs
            .readFileSync(`${path}/${pkg}/Schemas/${entity}/metadata.json`)
            .toString();
          metadataFile = metadataFile.slice(1, metadataFile.length);

          let metadata = metadataFile.split("+ MetaData.Schema.D2 ");
          let columns = metadata.slice(1, metadata.length - 1);

          columns.forEach((column) => {
            column = JSON.parse(column);

            instances[instances.length - 1].packages[
              instances[instances.length - 1].packages.length - 1
            ].entities[
              instances[instances.length - 1].packages[
                instances[instances.length - 1].packages.length - 1
              ].entities.length - 1
            ].columns.push({
              id: column.A2,
              type: lookupColumnDataType(column.S2),
            });
          });
        }
      });
    });

    console.log(instances);
    return instances;
  },
  loadPackagesList: (path) => {
    // Read Folders names from path '.../Terrasoft.WebApp/Terrasoft.Configuration/Pkg'
    let pkgList = fs.readdirSync(path);

    // Only Packages that have 'descriptor.json' are added to the list
    // The "Custom" package is not added to the list as it is not a good practice to use it for development
    pkgList = pkgList.filter((pkg) => {
      return (
        fs.existsSync(path + "/" + pkg + "/descriptor.json") && pkg != "Custom"
      );
    });

    return pkgList;
  },
  validatePath: (path) => {
    // If the path is copied from explorer it may contains \ instead of /
    path = path.replace(/\\/g, "/");

    if (!fs.existsSync(path)) {
      return "";
    }

    // If the path exists, check if it is a folder
    if (!fs.statSync(path).isDirectory()) {
      return "";
    }

    let fullPath = path + "/Terrasoft.WebApp/Terrasoft.Configuration/Pkg";

    if (!fs.existsSync(fullPath)) {
      return "";
    }

    if (!fs.statSync(fullPath).isDirectory()) {
      return "";
    }

    return fullPath;
  },
};

function lookupColumnDataType(typeId) {
  switch (typeId) {
    case "325a73b8-0f47-44a0-8412-7606f78003ac":
      return "text50";
    case "ddb3a1ee-07e8-4d62-b7a9-d0e618b00fbd":
      return "text250";
    case "5ca35f10-a101-4c67-a96a-383da6afacfc":
      return "text500";
    case "c0f04627-4620-4bc0-84e5-9419dc8516b1":
      return "textInf";
    case "3509b9dd-2c90-4540-b82e-8f6ae85d8248":
      return "textEncr";
    case "ecbcce18-2a17-4ead-829a-9d02fa9578a4":
      return "textCRC";
    case "6b6b74e2-820d-490e-a017-2b73d4ccf2b0":
      return "numInteger";
    case "07ba84ce-0bf7-44b4-9f2c-7b15032eb98c":
      return "numDec01";
    case "5cc8060d-6d10-4773-89fc-8c12d6f659a6":
      return "numDec001";
    case "3f62414e-6c25-4182-bcef-a73c9e396f31":
      return "numDec0001";
    case "ff22e049-4d16-46ee-a529-92d8808932dc":
      return "numDec00001";
    case "a4aaf398-3531-4a0d-9d75-a587f5b5b59e":
      return "numDec000000001";
    case "969093e2-2b4e-463b-883a-3d3b8c61f0cd":
      return "numCurrency";
    case "d21e9ef4-c064-4012-b286-fa1a8171da44":
      return "dateTime";
    case "603d4960-a1a2-45e9-b232-206a54421b01":
      return "date";
    case "04cc757b-8f06-482c-8a1a-0c0e171d2410":
      return "time";
    case "90b65bf8-0ffc-4141-8779-2420877af907":
      return "boolean";
    case "fa6e6e49-b996-475e-a77e-73904e4c5a88":
      return "image";
    case "b039feb0-ee7c-4884-8aa6-d6d45d84316f":
      return "imageLink";
    case "ba40cfc5-f554-4c26-8f57-1bb29cf43c4e":
      return "file";
    case "dafb71f9-ee9f-4e0b-a4d7-37aa15987155":
      return "color";
    case "23018567-a13c-4320-8687-fd6f9e3699bd":
      return "uuid";
    case "b7342b7a-5dde-40de-aa7c-24d2a57b3202":
      return "blob";
    case "b295071f-7ea9-4e62-8d1a-919bf3732ff2":
      return "lookup";
    case "8b3f29bb-ea14-4ce5-a5c5-293a929b6ba2":
      return "text";
    default:
      return "undefined";
  }
}
