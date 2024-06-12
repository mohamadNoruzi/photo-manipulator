import { create } from "zustand";

type Image = {
  imageUri: string;
  imageSize: number;
  addImageUri: (uri: string) => void;
  removeImageUri: () => void;
  addSize: (size: number) => void;
};

const useImageStore = create<Image>()((set) => ({
  imageUri: "",
  imageSize: 0,
  addImageUri: (uri) => set(() => ({ imageUri: uri })),
  addSize: (size) => set(() => ({ imageSize: size })),
  removeImageUri: () => set(() => ({ imageUri: "" })),
}));

export default useImageStore;
