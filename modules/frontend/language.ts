///<reference path="../../typings/tsd.d.ts" />
//FIXME: Get better i18next typings.
import lodash = require("lodash");
import moment = require("moment");
import accounting = require("accounting");
var i18n = require("i18next");
var translations = require("dynamic-metadata").translations;

var accountingDefaultSettings = _.cloneDeep(accounting.settings);
var defaultsDeep = _.partialRight(_.merge, function deep(value, other) {
  return _.merge(value, other, deep);
});

export function getLanguage(): string {
  return i18n.lng();
}

export function getAlternateLanguages(): string[] {
  // For now, only support French and English.
  return [getLanguage() === "en" ? "fr" : "en"];
}

function synchronizeLanguage(language: string): void {
  moment.locale(language);
  var accountingSettings = i18n.exists("language::accounting") ?
    i18n.t("language::accounting") :
    {};

  accounting.settings = defaultsDeep(
    accountingSettings,
    accountingDefaultSettings
  );
}

export function setLanguage(language: string): void {
  var website = require("website");
  i18n.setLng(language, function() {
    // Async if the language resources ever needed to be loaded on the fly.
    synchronizeLanguage(language);
    website.render();
  });
}

// Moment.js date formatting.
export function formatDate(
  dateToFormat: Date,
  dateFormat: string = "L"
): string {
  return moment(dateToFormat).format(dateFormat);
}

// Accounting.js redirect.
export function formatMoney(): string {
  return accounting.formatMoney.apply(this, arguments);
}

export function formatNumber(): string {
  return accounting.formatNumber.apply(this, arguments);
}

export function formatColumn(): string {
  return accounting.formatColumn.apply(this, arguments);
}

export function toFixed(): string {
  return accounting.toFixed.apply(this, arguments);
}

export function unformat(amount: string): number {
  return accounting.unformat(amount);
}

export function getCurrencySymbol() {
  return accounting.settings.currency.symbol;
}

var i18nOptions: any = {
  getAsync: false,
  fallbackLng: "en",
  cookieName: "lang",
  detectLngQS: "lang",
  useLocalStorage: false,
  ns: "general",
  nsseparator: "::",
  resStore: translations,
  returnObjectTrees: true,
};

if(__DEV__) {
  var missingKeys = {};
  i18nOptions.sendMissing = true;
  i18nOptions.missingKeyHandler = function(lng, ns, key, all) {
    if(!missingKeys[all]) {
      console.warn(
        "Missing localized key: lng: %s, namespace: %s, key: %s. args:",
        lng, ns, key, arguments
      );
      missingKeys[all] = arguments;
    }
  }
}

i18n.init(i18nOptions, function(){
  synchronizeLanguage(i18n.lng());
});

export var __ = i18n.t;
