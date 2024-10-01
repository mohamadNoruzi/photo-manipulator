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
  qualityNumberParameters: number;
  endQuality: boolean;
  setImagesDetail: (value: imageDetail) => void;
  removeImagesDetail: () => void;
  setMaxQualitySize: (value: number) => void;
  setFormat: (value: string) => void;
  setCompressDetailArray: (value: compressDetail) => void;
  removeCompressArray: () => void;
  removeItemCompressArray: (index: number) => void;
  setQualityNumberParameters: () => void;
};

export const useImagesDetail = create<DetailsArray>()((set) => ({
  detailsArray: [],
  MaxQualitySize: 0,
  format: "",
  compressDetailArray: [],
  qualityNumberParameters: 1,
  endQuality: false,
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
  setQualityNumberParameters: () => {
    set((state) => {
      if (state.qualityNumberParameters !== 0.1) {
        state.qualityNumberParameters *= 10;
        state.qualityNumberParameters -= 1;
        state.qualityNumberParameters /= 10;
      } else {
        state.endQuality = true;
      }
      return {};
    });
  },
}));
