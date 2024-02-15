import { createSlice } from "@reduxjs/toolkit";

interface IRobot {
  body: string;
  heads: string;
  chest: string;
  eyes: string;
  arms: string;
  colors: {
    eyes: string;
    body1: string;
    body2: string;
  };
}
const initialState = {
  body: "Initial",
  heads: "Initial",
  chest: "Initial",
  eyes: "Initial",
  arms: "Initial",
  colors: {
    eyes: "#00dcff",
    body1: "#1D2123",
    body2: "#000",
  },
};

export const slice = createSlice({
  name: "robot",
  initialState,
  reducers: {
    setEye: (state, { payload }) => {
      return {
        ...state,
        eyes: payload,
      };
    },
    setArms: (state, { payload }) => {
      return {
        ...state,
        arms: payload,
      };
    },
    resetRobot: () => {
      return initialState;
    },
  },
});

export const { setEye, setArms, resetRobot } = slice.actions;
export default slice.reducer;
export const selectorRobot = (state: { robot: IRobot }): IRobot => state.robot;
