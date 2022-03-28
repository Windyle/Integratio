"use strict";

// Import Modules
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// Import Maps
const { types, blanks } = require("../maps/Types.Map");
const { inheritedColumns } = require("../maps/InheritedColumns.Map");

let global_instances = [];

module.exports = {
  generateInstancesList: () => {
    return new Promise(function (resolve) {
      let instances = [];
      let findPkg = [];
      let findEntity = [];

      // Open DB connection
      let db = new sqlite3.Database("./src/intdb.db");

      db.serialize(() => {
        // Get all instances
        db.each("SELECT * FROM Instance", [], (err, row) => {
          if (err) {
            throw err;
          }

          instances.push({
            id: "" + row.Id,
            text: row.Name,
            path: row.Path,
            packages: [],
          });
        });

        // Get all packages
        db.each("SELECT * FROM Package", [], (err, row) => {
          if (err) {
            throw err;
          }

          let instanceIndex = instances.findIndex((instance) => instance.id == row.InstanceId);

          // Add package to its instance
          instances[instanceIndex].packages.push({
            id: "" + row.Id,
            text: row.Name,
            entities: [],
          });

          // Save package indexes for later lookups
          findPkg.push({
            id: row.Id,
            index: instances[instanceIndex].packages.length - 1,
            instanceIndex: instanceIndex,
          });
        });

        // Get all entities
        db.each("SELECT * FROM Entity", [], (err, row) => {
          if (err) {
            throw err;
          }

          let indexInfo = findPkg[findPkg.findIndex((fp) => fp.id == row.PackageId)];

          // Add entity to its package
          instances[indexInfo.instanceIndex].packages[indexInfo.index].entities.push({
            id: row.Id,
            text: row.Name,
            methods: [],
            columns: [],
          });

          // Save entity indexes for later lookups
          findEntity.push({
            id: row.Id,
            index: instances[indexInfo.instanceIndex].packages[indexInfo.index].entities.length - 1,
            packageIndex: indexInfo.index,
            instanceIndex: indexInfo.instanceIndex,
          });
        });

        // Get all methods
        db.each("SELECT * FROM Method", [], (err, row) => {
          if (err) {
            throw err;
          }

          let indexInfo = findEntity[findEntity.findIndex((fe) => fe.id == row.EntityId)];

          // Add method to its entity
          instances[indexInfo.instanceIndex].packages[indexInfo.packageIndex].entities[indexInfo.index].methods.push({
            id: "" + row.Id,
            type: row.Type,
          });
        });

        // Get all columns
        db.each(
          "SELECT * FROM Column",
          [],
          (err, row) => {
            if (err) {
              throw err;
            }

            let indexInfo = findEntity[findEntity.findIndex((fe) => fe.id == row.EntityId)];

            // Add column to its entity
            instances[indexInfo.instanceIndex].packages[indexInfo.packageIndex].entities[indexInfo.index].columns.push({
              id: "" + row.Id,
              name: row.Name,
              type: row.Type,
            });
          },
          () => {
            global_instances = instances;
            resolve(global_instances);
          }
        );
      });
    });
  },
  getInstances: () => {
    return global_instances;
  },
  getInstanceInfo: (id) => {
    // Declare instance info template
    let info = {
      id: id,
      name: "",
      path: "",
    };

    // Populate info with intance information
    info.name = global_instances[global_instances.findIndex((instance) => instance.id === id)].text;
    info.path = global_instances[global_instances.findIndex((instance) => instance.id === id)].path;

    return info;
  },
  addInstanceToDB: (name, path, pkgs) => {
    return new Promise(function (resolve) {
      // Open DB connection
      let db = new sqlite3.Database("./src/intdb.db");

      // Initialize last IDs for query preparation
      let lastInstanceId;
      let lastPackageId;
      let lastEntityId;

      // Query last IDs for query preparation
      db.serialize(() => {
        db.get("SELECT seq FROM sqlite_sequence WHERE name='Instance'", [], (err, row) => {
          if (err) {
            return console.error(err.message);
          }

          lastInstanceId = row ? row.seq : 0;
          console.log(`Last Instance ID: ${lastInstanceId}`);
        });

        db.get("SELECT seq FROM sqlite_sequence WHERE name='Package'", [], (err, row) => {
          if (err) {
            return console.error(err.message);
          }

          lastPackageId = row ? row.seq : 0;
          console.log(`Last Package ID: ${lastPackageId}`);
        });

        db.get("SELECT seq FROM sqlite_sequence WHERE name='Entity'", [], async (err, row) => {
          if (err) {
            return console.error(err.message);
          }

          lastEntityId = row ? row.seq : 0;
          console.log(`Last Entity ID: ${lastEntityId}`);

          await insertToDB(lastInstanceId, lastPackageId, lastEntityId, db, name, path, pkgs);

          resolve();
        });
      });
    });
  },
  editInstance: (id, name, path) => {
    return new Promise((resolve) => {
      // Update Instances List
      global_instances[global_instances.findIndex((instance) => instance.id === id)].text = name;
      global_instances[global_instances.findIndex((instance) => instance.id === id)].path = path;

      // Open DB connection
      let db = new sqlite3.Database("./src/intdb.db");

      // Update Instance on DB
      db.serialize(() => {
        db.run("UPDATE Instance SET Name = ?, Path = ? WHERE Id = ?", [name, path, id], (err) => {
          if (err) {
            return console.error(err.message);
          }

          resolve();
        });
      });
    });
  },
  deleteInstanceFromDB: (id) => {
    return new Promise(function (resolve) {
      // Open DB connection
      let db = new sqlite3.Database("./src/intdb.db");

      // Delete Instance and linked entities
      db.serialize(() => {
        db.run("DELETE FROM Instance WHERE Id=?", [id], (err) => {
          if (err) {
            return console.error(err.message);
          }
        });

        db.run("DELETE FROM Package WHERE InstanceId=?", [id], (err) => {
          if (err) {
            return console.error(err.message);
          }
        });

        db.run("DELETE FROM Entity WHERE PackageId NOT IN (SELECT Id FROM Package)", [], (err) => {
          if (err) {
            return console.error(err.message);
          }
        });

        db.run("DELETE FROM Method WHERE EntityId NOT IN (SELECT Id FROM Entity)", [], (err) => {
          if (err) {
            return console.error(err.message);
          }
        });

        db.run("DELETE FROM Column WHERE EntityId NOT IN (SELECT Id FROM Entity)", [], (err) => {
          if (err) {
            return console.error(err.message);
          }

          resolve();
        });
      });
    });
  },
  loadPackagesList: (path) => {
    // Read Folders names from path '.../Terrasoft.WebApp/Terrasoft.Configuration/Pkg'
    let pkgList = fs.readdirSync(path);

    // Only Packages that have 'descriptor.json' are added to the list
    // The "Custom" package is not added to the list as it is not a good practice to use it for development
    pkgList = pkgList.filter((pkg) => {
      return fs.existsSync(path + "/" + pkg + "/descriptor.json") && pkg != "Custom";
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
  getEntity: (instanceId, packageId, entityId) => {
    // Declare entity template
    let entity = {
      id: entityId,
      name: "",
      packageId: packageId,
      instanceId: instanceId,
      columns: [],
    };

    // Populate entity with entity information
    let obj_entity =
      global_instances[global_instances.findIndex((instance) => instance.id == instanceId)].packages[
        global_instances[global_instances.findIndex((instance) => instance.id == instanceId)].packages.findIndex(
          (pkg) => pkg.id == packageId
        )
      ].entities[
        global_instances[global_instances.findIndex((instance) => instance.id == instanceId)].packages[
          global_instances[global_instances.findIndex((instance) => instance.id == instanceId)].packages.findIndex(
            (pkg) => pkg.id == packageId
          )
        ].entities.findIndex((entity) => entity.id == entityId)
      ];

    entity.name = obj_entity.text;

    // Get entity columns
    entity.columns = obj_entity.columns;

    return entity;
  },
  generateBlankBody: (columns) => {
    let body = "{";

    columns.forEach((column) => {
      if (
        column.name === "Id" ||
        column.name === "CreatedOn" ||
        column.name === "CreatedBy" ||
        column.name === "ModifiedOn" ||
        column.name === "ModifiedBy" ||
        column.name === "ProcessListeners"
      )
        return;

      // Add column to body
      body += `\n  "${column.name}" : ${blanks[column.type]},`;
    });

    body += "\n}";

    return body;
  },
};

function insertToDB(lastInstanceId, lastPackageId, lastEntityId, db, name, path, pkgs) {
  return new Promise(function (resolve) {
    // Instance
    let instanceQuery = "INSERT INTO Instance(Name, Path) VALUES(?,?)";
    let instanceValues = [name, path];
    lastInstanceId = lastInstanceId + 1;

    // Package Declaration
    let packageQuery = "INSERT INTO Package(Name, InstanceId) VALUES(?,?)";
    let packageValues = pkgs.map((pkg) => [pkg, lastInstanceId]);
    lastPackageId = lastPackageId + 1;

    // Entity Declaration
    let entityQuery = "INSERT INTO Entity(Name, PackageId) VALUES(?,?)";
    let entityValues = [];
    lastEntityId = lastEntityId + 1;

    // Method Declaration
    let methodQuery = "INSERT INTO Method(Type, EntityId) VALUES(?,?)";
    let methodValues = [];

    // Column Declaration
    let columnQuery = "INSERT INTO Column(Name, EntityId, Type) VALUES(?,?,?)";
    let columnValues = [];

    pkgs.forEach((pkg) => {
      // Read entities names from package "Schemas" folder
      let entities = fs.readdirSync(path + "/" + pkg + "/Schemas");

      entities.forEach((entity) => {
        // We need to check if the descriptor contains the right info to confirm it's an entity
        let descriptorFile = fs.readFileSync(`${path}/${pkg}/Schemas/${entity}/descriptor.json`).toString();
        descriptorFile = descriptorFile.slice(1, descriptorFile.length);

        let descriptorJson = JSON.parse(descriptorFile);

        if (
          descriptorJson.Descriptor.ManagerName === "EntitySchemaManager" &&
          (descriptorJson.Descriptor.Parent.Name === "BaseEntity" ||
            descriptorJson.Descriptor.Parent.Name === descriptorJson.Descriptor.Name)
        ) {
          // Add Values to the entityValues array for the query
          entityValues.push([entity, lastPackageId]);

          // Add Values to the methodValues array for the actual entity
          methodValues.push(["GET", lastEntityId]);
          methodValues.push(["POST", lastEntityId]);
          methodValues.push(["PATCH", lastEntityId]);
          methodValues.push(["DELETE", lastEntityId]);

          // Read entity metadata to read the columns definitions
          let metadataFile = fs.readFileSync(`${path}/${pkg}/Schemas/${entity}/metadata.json`).toString();
          // Clear the hidden special character at the beginning of the file
          metadataFile = metadataFile.slice(1, metadataFile.length);

          // Load Inherited columns, found in metadata D2 Nodes with E16 false
          let inhColumns = metadataFile
            .split('+ MetaData.Schema.D2.["')
            .filter((row) => row.endsWith('"].E16 false') || row.endsWith('"].E16 false\r\n'))
            .map((row) => row.replace('"].E16 false', ""))
            .map((row) => row.toString())
            .map((row) => row.replace("\r\n", ""));

          inhColumns.forEach((columnId) => {
            let column = inheritedColumns[columnId];

            if (column === undefined) {
              console.warn(pkg + " -> " + entity + ": Inherited Columns from custom objects are not support yet.");
              return;
            }

            // Add Values to the columnValues array for the actual entity
            columnValues.push([column.name, lastEntityId, column.type]);
          });

          // We only need column information stored in the D2 Nodes
          let metadata = metadataFile.split("+ MetaData.Schema.D2 ");
          let columns = metadata.slice(1, metadata.length - 1);

          columns.forEach((column) => {
            column = JSON.parse(column);

            // Add Values to the columnValues array for the actual entity
            columnValues.push([column.A2, lastEntityId, types[column.S2]]);
          });

          // Increment lastEntityId to point to the actual lastEntityId
          ++lastEntityId;
        }
      });

      // Increment Last Package Id for next Entities Link
      ++lastPackageId;
    });

    db.serialize(() => {
      db.run(instanceQuery, instanceValues, function (err) {
        if (err) {
          return console.log(err.message);
        }
      });

      let stmt;
      db.serialize(() => {
        stmt = db.prepare(packageQuery);

        for (let i = 0; i < packageValues.length; i++) {
          stmt.run(packageValues[i], function (err) {
            if (err) {
              console.error(err.message);
            }
          });
        }

        stmt.finalize();

        db.serialize(() => {
          stmt = db.prepare(entityQuery);

          for (let i = 0; i < entityValues.length; i++) {
            stmt.run(entityValues[i], function (err) {
              if (err) {
                console.error(err.message);
              }
            });
          }

          stmt.finalize();

          db.serialize(() => {
            stmt = db.prepare(methodQuery);

            for (let i = 0; i < methodValues.length; i++) {
              stmt.run(methodValues[i], function (err) {
                if (err) {
                  console.error(err.message);
                }
              });
            }

            stmt.finalize();

            db.serialize(() => {
              stmt = db.prepare(columnQuery);

              for (let i = 0; i < columnValues.length; i++) {
                stmt.run(columnValues[i], function (err) {
                  if (err) {
                    console.error(err.message);
                  }
                });
              }

              stmt.finalize();
            });
          });
        });
      });
    });

    // close the database connection
    db.close((err) => {
      if (err) return console.error(err.message);

      resolve();
    });
  });
}
