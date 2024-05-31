import { I18n } from "i18n-js";

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en: { welcome: "Hello", name: "Charlie" },
  fa: { welcome: "سلام" },
};
const i18n = new I18n(translations);

export default i18n;
