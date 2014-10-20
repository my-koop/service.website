var moduleExports = {};

module.exports = moduleExports;

/* //<reference path="../../typings/i18next/i18next.d.ts" /> */
//import i18n = require("i18next");
var i18n = require("i18next");
var translations = require("dynamic-metadata");

console.log("language strings:", translations);

i18n.init({
  getAsync: false,
  lng: "en-US",
  fallbackLng: "en",
  cookieName: "lang",
  detectLngQS: "lang",
  useLocalStorage: false,
  ns: "general",
  nsseparator: "::",
  resStore: translations.translations
});

moduleExports.__ = i18n.t;

//export __;
