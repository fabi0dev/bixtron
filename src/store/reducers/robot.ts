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
  configured: boolean;
  santaHat: boolean;
  snowEffect: boolean;
  scarf: boolean;
  eyeStyle: string;
  thruster: boolean;
}

const initialState: IRobot = {
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
  configured: false,
  santaHat: true,
  snowEffect: true,
  scarf: true,
  eyeStyle: "oval",
  thruster: false,
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
    setEyeColor: (state, { payload }) => {
      return {
        ...state,
        colors: {
          ...state.colors,
          eyes: payload,
        },
      };
    },
    setBodyColor1: (state, { payload }) => {
      return {
        ...state,
        colors: {
          ...state.colors,
          body1: payload,
        },
      };
    },
    setBodyColor2: (state, { payload }) => {
      return {
        ...state,
        colors: {
          ...state.colors,
          body2: payload,
        },
      };
    },
    setArms: (state, { payload }) => {
      return {
        ...state,
        arms: payload,
      };
    },
    setConfigured: (state, { payload }) => {
      return {
        ...state,
        configured: payload,
      };
    },
    setSantaHat: (state, { payload }) => {
      return {
        ...state,
        santaHat: payload,
      };
    },
    setSnowEffect: (state, { payload }) => {
      return {
        ...state,
        snowEffect: payload,
      };
    },
    setScarf: (state, { payload }) => {
      return {
        ...state,
        scarf: payload,
      };
    },
    setEyeStyle: (state, { payload }) => {
      return {
        ...state,
        eyeStyle: payload,
      };
    },
    setThruster: (state, { payload }) => {
      return {
        ...state,
        thruster: payload,
      };
    },
    resetRobot: () => {
      return initialState;
    },
  },
});

export const {
  setEye,
  setArms,
  setEyeColor,
  resetRobot,
  setBodyColor1,
  setBodyColor2,
  setConfigured,
  setSantaHat,
  setSnowEffect,
  setScarf,
  setEyeStyle,
  setThruster,
} = slice.actions;
export default slice.reducer;
export const selectorRobot = (state: { robot: IRobot }): IRobot => state.robot;
