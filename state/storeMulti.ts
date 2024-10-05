import { create } from "zustand";

export type imageDetail = {
  name: string | null | undefined;
  format: string | undefined;
  uri: string;
  height: number | null | undefined;
  width: number | null | undefined;
};

export type compressDetail = {
  index: number;
  uri: string;
  size: number;
  isLowerThanMax: boolean;
};

type DetailsArray = {
  MaxQualitySize: number;
  detailsArray: Array<imageDetail>;
  format: string | null | undefined;
  compressDetailArray: Array<compressDetail>;
  setImagesDetail: (value: imageDetail) => void;
  removeImagesDetail: () => void;
  setMaxQualitySize: (value: number) => void;
  setFormat: (value: string) => void;
  setCompressDetailArray: (value: compressDetail) => void;
  removeCompressArray: () => void;
  removeItemCompressArray: (index: number) => void;
};

export const useImagesDetail = create<DetailsArray>()((set) => ({
  detailsArray: [],
  MaxQualitySize: 0,
  format: "",
  compressDetailArray: [],

  setImagesDetail: (value) => {
    set((state) => {
      state.removeCompressArray();
      return { detailsArray: [...state.detailsArray, value] };
    });
  },

  removeImagesDetail: () => set(() => ({ detailsArray: [] })),
  setMaxQualitySize: (value) => set(() => ({ MaxQualitySize: value })),
  setFormat: (value) => set(() => ({ format: value })),

  setCompressDetailArray: (value) => {
    set((state) => {
      if (value.size <= state.MaxQualitySize * 1000) {
        value = { ...value, isLowerThanMax: true };
      }
      const removedIndexArray = state.compressDetailArray.filter(
        (item) => item.index !== value.index
      );
      return { compressDetailArray: [...removedIndexArray, value] };
    });
  },
  removeCompressArray: () => set(() => ({ compressDetailArray: [] })),
  removeItemCompressArray: (index) =>
    set((state) => {
      const newList = state.compressDetailArray.filter((item) => item.index !== index);
      return { compressDetailArray: [...newList] };
    }),
}));
