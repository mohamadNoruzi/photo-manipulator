import { create } from "zustand";
import { SaveFormat } from "expo-image-manipulator";

type Image = {
  imageUri: string;
  imageSize: number;
  orginalUri: string;
  addImageUri: (uri: string) => void;
  removeImageUri: () => void;
  addSize: (size: number) => void;
};

type slider = {
  lock: boolean;
  qualityValue: number;
  changeValue: (val: number) => void;
  changeLock: () => void;
};

type format = {
  format: SaveFormat | undefined | string;
  setFormat: (value: SaveFormat | string | undefined) => void;
};

const useImageStore = create<Image>()((set) => ({
  imageUri: "",
  orginalUri: "",
  imageSize: 0,
  addImageUri: (uri) =>
    set((prev) => ({
      imageUri: uri,
      orginalUri: prev.orginalUri ? prev.orginalUri : uri,
    })),
  addSize: (size) => set(() => ({ imageSize: size })),
  removeImageUri: () => set(() => ({ imageUri: "", orginalUri: "" })),
}));

const useSliderStore = create<slider>()((set) => ({
  qualityValue: 1,
  lock: false,
  changeValue: (val) =>
    set(() => ({ qualityValue: Math.trunc(val * 10) / 10 })),
  changeLock: () => set((prev) => ({ lock: !prev.lock })),
}));

const useFormatStore = create<format>()((set) => ({
  format: "",
  setFormat: (value) => set(() => ({ format: value })),
}));

export { useImageStore, useSliderStore, useFormatStore };
