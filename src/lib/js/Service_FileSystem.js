"use strict";

const fs = require("fs");

module.exports = {
  validatePath: (path) => {
    path = path.replace(/\\/g, "/");

    if (!fs.existsSync(path)) {
      return "";
    }

    if (!fs.statSync(path).isDirectory()) {
      return "";
    }

    let fullPath = path + "/Terrasoft.WebApp/Terrasoft.Configuration/Pkg";

    if (!fs.existsSync(fullPath)) {
      return "";
    }

    return fullPath;
  },
};
