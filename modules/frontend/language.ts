///<reference path="../../typings/tsd.d.ts" />
//FIXME: Get better i18next typings.
var i18n = require("i18next");
var translations = require("dynamic-metadata").translations;
var website = require("website");

//FIXME: Maybe put this in a config file...
var defaultLanguage = "en";

export function getLanguage(): string {
  return i18n.lng();
}

export function setLanguage(language: string): void {
  i18n.setLng(language, function() {
    // Async if the language resources ever needed to be loaded on the fly.
    website.render();
  });
}

i18n.init({
  getAsync: false,
  lng: defaultLanguage,
  fallbackLng: "en",
  cookieName: "lang",
  detectLngQS: "lang",
  useLocalStorage: false,
  ns: "general",
  nsseparator: "::",
  resStore: translations
});

export var __ = i18n.t;


