const RandomTextGenerator = require("random-text-generator");
const {
  rndText_learnFrom,
  rndTextNoSpace_learnFrom,
  rndTextEncrypted_learnFrom,
  rndTextCRC_learnFrom,
} = require("../../maps/Randomizer.Map");

// Text 50
let rndText50_settings = {
  safeMode: true,
  minLength: 8,
  maxLength: 20,
};

let rndText50 = new RandomTextGenerator(rndText50_settings);
for (let word of rndTextNoSpace_learnFrom) rndText50.learn(word);

// Text 250
let rndText250_settings = {
  safeMode: true,
  minLength: 10,
  maxLength: 240,
};

let rndText250 = new RandomTextGenerator(rndText250_settings);
for (let word of rndText_learnFrom) rndText250.learn(word);

// Text 500
let rndText500_settings = {
  safeMode: true,
  minLength: 10,
  maxLength: 490,
};

let rndText500 = new RandomTextGenerator(rndText500_settings);
for (let word of rndText_learnFrom) rndText500.learn(word);

// Text Encrypted
let rndTextEncr_settings = {
  safeMode: true,
  minLength: 10,
  maxLength: 490,
};

let rndTextEncr = new RandomTextGenerator(rndTextEncr_settings);
for (let word of rndTextEncrypted_learnFrom) rndTextEncr.learn(word);

// Text CRC
let rndTextCRC_settings = {
  safeMode: true,
  minLength: 10,
  maxLength: 490,
};

let rndTextCRC = new RandomTextGenerator(rndTextCRC_settings);
for (let word of rndTextCRC_learnFrom) rndTextCRC.learn(word);

// Random Date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Random UUID
function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

module.exports = {
  randomizeValue: (type) => {
    switch (type) {
      case "text50":
        return rndText50.generate();
      case "text250":
      case "text":
        return rndText250.generate();
      case "text500":
      case "textInf":
        return rndText500.generate();
      case "textEncr":
        return rndTextEncr.generate();
      case "textCRC":
        return rndTextCRC.generate();
      case "numInteger":
        return Math.floor(Math.random() * 5001);
      case "numDec01":
      case "numCurrency":
        return Math.round(Math.random() * 5001 * 100) / 100;
      case "numDec001":
        return Math.round(Math.random() * 5001 * 1000) / 1000;
      case "numDec0001":
        return Math.round(Math.random() * 5001 * 10000) / 10000;
      case "numDec00001":
        return Math.round(Math.random() * 5001 * 100000) / 100000;
      case "numDec000000001":
        return Math.round(Math.random() * 5001 * 1000000000) / 1000000000;
      case "dateTime":
        return randomDate(new Date(2012, 0, 1), new Date()).toISOString();
      case "date":
        return randomDate(new Date(2012, 0, 1), new Date()).toISOString().substring(0, 10) + "T00:00:00.000Z";
      case "time":
        return (
          new Date().toISOString().substring(0, 10) +
          randomDate(new Date(2012, 0, 1), new Date()).toISOString().substring(11, 19) +
          "Z"
        );
      case "boolean":
        return Math.random() >= 0.5;
      case "image":
        return "";
      case "imageLink":
        return "";
      case "file":
        return "";
      case "color":
        return "" + Math.floor(Math.random() * 16777215).toString(16);
      case "uuid":
      case "lookup":
        return create_UUID();
      case "blob":
        return "";
    }
  },
};
