/**
 * Current Instance variable
 *
 * Updating it updates the current instance label in the top left corner
 */

let currentInstanceObj = {
  currentInstance: "",
};
var currentInstanceProxy = new Proxy(currentInstanceObj, {
  set: function (target, key, value) {
    document.getElementById("instance-display").innerHTML = value;
    return true;
  },
});
