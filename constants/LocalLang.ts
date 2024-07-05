import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import { useLanguageStore } from "@/state/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translations = {
  en: {
    welcome: "Hello",
    quality: "Quality",
    removeImage: "Remove Image",
    importImage: "Import Image",
    save: "Save",
    getStarted: "Get Started",
    greeting1: "Transform your photos effortlessly",
    greeting2:
      "Our app provides simple and powerful tools to change the format and size of your pictures",
    modal1: "The Picture has been saved in below directory:",
    modal2: "Internal Storage/Pictures",
  },
  fa: {
    welcome: "سلام",
    quality: "کیفیت",
    removeImage: "پاک کردن تصویر",
    importImage: "انتخاب تصویر",
    save: "ذخیره",
    getStarted: "شروع کنید",
    greeting1: "عکس‌های خود را به سادگی تغییر دهید",
    greeting2:
      "برنامه ما ابزارهای ساده و قدرتمندی را برای تغییر قالب و اندازه تصاویر شما ارائه می دهد",
    modal1: "تصویر در مسیر زیر ذخیره شده است:",
    modal2: "Internal Storage/Pictures",
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
      i18n.locale = storedLan;
    }
  } catch (e) {}
};

getData();

export default i18n;
