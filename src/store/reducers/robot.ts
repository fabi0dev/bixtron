import { createSlice } from "@reduxjs/toolkit";

interface IRobot {
  data: [];
}
const initialState = {
  data: {},
};

export const slice = createSlice({
  name: "robot",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setData } = slice.actions;
export default slice.reducer;
export const selectorLatest = (state: { latest: IRobot }) => state.latest;
