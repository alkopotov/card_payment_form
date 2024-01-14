import { createSlice } from "@reduxjs/toolkit";

export const logoSlice = createSlice({
  name: 'logo',
  initialState: {value: 0},
  reducers: {
    logoVisaAction: (state) => {state.value = 4},
    logoMasterCardAction: (state) => {state.value = 5},
    logoUndefinedAction: (state) => {state.value = 0},
  },
})

export const {logoVisaAction, logoMasterCardAction, logoUndefinedAction} = logoSlice.actions;

export default logoSlice.reducer;

