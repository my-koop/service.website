///<reference path="../../typings/i18next/i18next.d.ts" />
import i18n = require("i18next");
//var i18n = require("i18next");
var translations = require("dynamic-metadata").translations;

i18n.init({
  getAsync: false,
  lng: "en-US",
  fallbackLng: "en",
  cookieName: "lang",
  detectLngQS: "lang",
  useLocalStorage: false,
  ns: "general",
  nsseparator: "::",
  resStore: translations
});

export = {
  __: i18n.t
};

