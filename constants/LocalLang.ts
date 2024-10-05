import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import { useLanguageStore } from "@/state/storeSingle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translations = {
  en: {
    welcome: "Hello",
    quality: "Quality",
    removeImage: "Remove Image",
    importImage: "Import Image",
    importImages: "Import Images",
    save: "Save",
    getStarted: "Get Started",
    greeting1: "Transform your photos effortlessly",
    greeting2:
      "Our app provides simple and powerful tools to change the format and size of your pictures",
    modal1: "The Picture has been saved in below directory:",
    modal2: "Internal Storage/Pictures/FormatResizer",
    maxSize: "Determine the maximum size for all images",
    maxPlaceHolder: "Like 250",
    formatPlaceHolder: "Select Format",
    png1: "*PNG format is not compressible*",
    png2: "*If you choose PNG just format changes*",
    png3: "First, compress the file to another format and save it. Then convert the format to PNG if you want to reduce the size.",
    start: "Start",
    cancel: "Cancel",
    error: "Error",
    successful: "Successful",
    errorText: "Please Pick images again",
    maxText: "Some images cannot be compressed to the selected maximum size.",
    save1: "Congratulation",
    save2: "Images has been saved successfully at",
    images: "Images",
    tabOne: "One",
    tabTwo: "Multiple",
  },
  fa: {
    welcome: "سلام",
    quality: "کیفیت",
    removeImage: "پاک کردن تصویر",
    importImage: "انتخاب تصویر",
    importImages: "انتخاب تصاویر",
    save: "ذخیره",
    getStarted: "شروع کنید",
    greeting1: "عکس‌های خود را به سادگی تغییر دهید",
    greeting2:
      "برنامه ما ابزارهای ساده و قدرتمندی را برای تغییر قالب و اندازه تصاویر شما ارائه می دهد",
    modal1: "تصویر در مسیر زیر ذخیره شده است:",
    modal2: "Internal Storage/Pictures/FormatResizer",
    maxSize: "حداکثر اندازه را برای همه تصاویر تعیین کنید",
    maxPlaceHolder: "مانند 250",
    formatPlaceHolder: "فرمت انتخاب کنید",
    png1: "*فرمت PNG قابل تراکم نیست*",
    png2: "*اگر PNG را انتخاب کنید فقط فرمت تغییر می کند*",
    png3: "ابتدا فایل را با فرمت دیگری فشرده و ذخیره کنید. سپس اگر می خواهید اندازه را کاهش دهید، فرمت را به PNG تبدیل کنید.",
    start: "شروع",
    cancel: "لغو",
    error: "خطا",
    successful: "موفق",
    errorText: "لطفا دوباره تصاویر را انتخاب کنید",
    maxText: "برخی از تصاویر را نمی توان به حداکثر اندازه انتخاب شده فشرده کرد.",
    save1: "تبریک ",
    save2: "تصاویر با موفقیت ذخیره شده اند در",
    images: "تصاویر",
    tabOne: "تکی",
    tabTwo: "چندتایی",
  },
};
const i18n = new I18n(translations);
// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0]?.languageCode ?? "en";
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
