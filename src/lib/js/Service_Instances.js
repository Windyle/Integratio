const fs = require("fs");

let instances = [
  {
    id: "testaccount",
    text: "Account Test",
    expanded: false,
    packages: [
      {
        id: "tst",
        text: "Tst",
        expanded: false,
        entities: [
          {
            id: "Account",
            expanded: false,
            methods: [
              {
                id: "getaccount",
                text: "GET",
              },
              {
                id: "postaccount",
                text: "POST",
              },
              {
                id: "patchaccount",
                text: "PATCH",
              },
              {
                id: "deleteaccount",
                text: "DELETE",
              },
            ],
          },
          {
            id: "tstDetailDiscounts",
            expanded: false,
            methods: [
              {
                id: "getaccount",
                text: "GET",
              },
              {
                id: "postaccount",
                text: "POST",
              },
              {
                id: "patchaccount",
                text: "PATCH",
              },
              {
                id: "deleteaccount",
                text: "DELETE",
              },
            ],
          },
          {
            id: "tstDetailAccountBillingInfo",
            expanded: false,
            methods: [
              {
                id: "getaccount",
                text: "GET",
              },
              {
                id: "postaccount",
                text: "POST",
              },
              {
                id: "patchaccount",
                text: "PATCH",
              },
              {
                id: "deleteaccount",
                text: "DELETE",
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

      let entities = fs.readdirSync(path + "/" + pkg + "/Data");

      entities.forEach((entity) => {
        if (
          entity.startsWith("SysDcm") ||
          entity.startsWith("SysDetail") ||
          entity.startsWith("SysModule") ||
          entity.startsWith("RunProcess") ||
          entity.startsWith("SysWidgetDashboard")
        ) {
          return;
        }

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
              text: "GET",
            },
            {
              id:
                pkg
                  .replace(/\s/g, "")
                  .replace(/[.,-/()]/g, "")
                  .toLowerCase() +
                "post" +
                entity,
              text: "POST",
            },
            {
              id:
                pkg
                  .replace(/\s/g, "")
                  .replace(/[.,-/()]/g, "")
                  .toLowerCase() +
                "patch" +
                entity,
              text: "PATCH",
            },
            {
              id:
                pkg
                  .replace(/\s/g, "")
                  .replace(/[.,-/()]/g, "")
                  .toLowerCase() +
                "delete" +
                entity,
              text: "DELETE",
            },
          ],
          columns: [],
        });

        let descriptorFile = fs
          .readFileSync(`${path}/${pkg}/Data/${entity}/descriptor.json`)
          .toString();
        descriptorFile = descriptorFile.slice(1, descriptorFile.length);

        let descriptorJson = JSON.parse(descriptorFile);

        let columns = descriptorJson.Descriptor.Columns;

        columns.forEach((column) => {
          instances[instances.length - 1].packages[
            instances[instances.length - 1].packages.length - 1
          ].entities[
            instances[instances.length - 1].packages[
              instances[instances.length - 1].packages.length - 1
            ].entities.length - 1
          ].columns.push({
            id: column.ColumnName,
            type: lookupColumnDataType(column.DataTypeValueUId),
          });
        });
      });
    });

    console.log(instances);
    return instances;
  },
  loadPackagesList: (path) => {
    let pkgList = fs.readdirSync(path);

    pkgList = pkgList.filter((pkg) => {
      return (
        fs.existsSync(path + "/" + pkg + "/descriptor.json") && pkg != "Custom"
      );
    });

    return pkgList;
  },
};

function lookupColumnDataType(typeId) {
  switch (typeId) {
    case "1":
      return "string";
    case "2":
      return "integer";
    case "3":
      return "float";
    case "4":
      return "boolean";
    case "5":
      return "date";
    case "6":
      return "datetime";
    case "7":
      return "lookup";
    case "8":
      return "memo";
    case "9":
      return "text";
    case "10":
      return "time";
    case "11":
      return "image";
    case "12":
      return "file";
    default:
      return "string";
  }
}
