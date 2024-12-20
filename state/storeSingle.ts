import { create } from "zustand";
import { SaveFormat } from "expo-image-manipulator";

type Image = {
  imageUri: string;
  imageSize: number;
  orginalUri: string;
  imageRatio: any;
  constRatio: any;
  addImageUri: (uri: string) => void;
  removeImageUri: () => void;
  addSize: (size: number) => void;
  setImageRatio: (h: any, w: any) => void;
};

type slider = {
  qualityValue: number;
  changeQualityValue: (val: number) => void;
};

type format = {
  format: SaveFormat | undefined | string;
  setFormat: (value: SaveFormat | string | undefined) => void;
};

type language = {
  lan: "en" | "fa";
  setLan: (L: "en" | "fa") => void;
};

const useImageStore = create<Image>()((set) => ({
  imageUri: "",
  orginalUri: "",
  imageSize: 0,
  imageRatio: [0, 0],
  constRatio: null,

  addImageUri: (uri) =>
    set((prev) => ({
      imageUri: uri,
      orginalUri: prev.orginalUri ? prev.orginalUri : uri,
    })),
  addSize: (size) => set(() => ({ imageSize: size })),
  removeImageUri: () =>
    set(() => ({
      imageUri: "",
      orginalUri: "",
      imageSize: 0,
    })),

  setImageRatio: (h, w) =>
    set((state) => ({
      imageRatio: [h, w],
      constRatio: state.constRatio ? state.constRatio : [h, w],
    })),
}));

const useSliderStore = create<slider>()((set) => ({
  qualityValue: 1,
  changeQualityValue: (val) => set(() => ({ qualityValue: Math.trunc(val * 10) / 10 })),
}));

const useFormatStore = create<format>()((set) => ({
  format: "",
  setFormat: (value) => set(() => ({ format: value })),
}));

const useLanguageStore = create<language>()((set) => ({
  lan: "fa",
  setLan: (L) => set(() => ({ lan: L })),
}));

export { useImageStore, useSliderStore, useFormatStore, useLanguageStore };
