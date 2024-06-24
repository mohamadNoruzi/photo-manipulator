import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import { useLanguageStore } from "@/state/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en: {
    welcome: "Hello",
    quality: "Quality",
    removeImage: "Remove Image",
    importImage: "Import Image",
    save: "Save",
  },
  fa: {
    welcome: "سلام",
    quality: "کیفیت",
    removeImage: "پاک کردن تصویر",
    importImage: "انتخاب تصویر",
    save: "ذخیره",
  },
};
const i18n = new I18n(translations);
// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? "en";
// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

const getData = async () => {
  try {
    const storedLan = await AsyncStorage.getItem("stored-language");
    if (storedLan !== null) {
      console.log("storedLan", storedLan);
      i18n.locale = storedLan;
    }
  } catch (e) {
    console.log("localLang", e);
  }
};

getData();

export default i18n;
