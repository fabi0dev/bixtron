import { createSlice } from "@reduxjs/toolkit";

interface IBixtronCore {
  isAfraid: boolean;
  isHappy: boolean;
  isFalling: boolean;
  isHigh: boolean;
}
const initialState = {
  isAfraid: false, //está bravo
  isHappy: true, //está feliz
  isFalling: false, //está caindo
  isHigh: false, //está no alto do chão
};

export const slice = createSlice({
  name: "bixtronCore",
  initialState,
  reducers: {
    setCore: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setCore } = slice.actions;
export default slice.reducer;
export const selectorBixtronCore = (state: {
  bixtronCore: IBixtronCore;
}): IBixtronCore => state.bixtronCore;
