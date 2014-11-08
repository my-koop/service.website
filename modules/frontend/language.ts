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

//FIXME: Temporary placeholder. See #198.
export function formatDate(dateToFormat: Date): string {
  //FIXME: Extremely basic formatting, we'll be using moment.js instead.
  return dateToFormat.toLocaleDateString();
}

//FIXME: Temporary placeholder. See #199.
export function formatMoney(amount: number): string {
  //FIXME: Extremely basic formatting, we'll be using accounting.js instead.
  return amount.toFixed(2) + " $";
}

var i18nOptions: any = {
  getAsync: false,
  lng: defaultLanguage,
  fallbackLng: "en",
  cookieName: "lang",
  detectLngQS: "lang",
  useLocalStorage: false,
  ns: "general",
  nsseparator: "::",
  resStore: translations,
};

if(__DEV__) {
  var missingKeys = {};
  i18nOptions.sendMissing = true;
  i18nOptions.missingKeyHandler = function(lng, ns, key, all) {
    if(!missingKeys[all]) {
      console.warn(
        "Missing localized key: lng:%s, namespace:%s, key:%s. args:",
        lng, ns, key, arguments
      );
      missingKeys[all] = arguments;
    }
  }
}

i18n.init(i18nOptions);

export var __ = i18n.t;


