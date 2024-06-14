import { create } from "zustand";

type Image = {
  imageUri: string;
  imageSize: number;
  addImageUri: (uri: string) => void;
  removeImageUri: () => void;
  addSize: (size: number) => void;
};

type slider = {
  qualityValue: number;
  changeValue: (val: number) => void;
};

const useImageStore = create<Image>()((set) => ({
  imageUri: "",
  imageSize: 0,
  addImageUri: (uri) => set(() => ({ imageUri: uri })),
  addSize: (size) => set(() => ({ imageSize: size })),
  removeImageUri: () => set(() => ({ imageUri: "" })),
}));

const useSliderStore = create<slider>()((set) => ({
  qualityValue: 1,
  changeValue: (val) =>
    set(() => ({ qualityValue: Math.trunc(val * 10) / 10 })),
}));

export { useImageStore, useSliderStore };
