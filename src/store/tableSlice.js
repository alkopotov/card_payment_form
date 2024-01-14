import { createSlice } from "@reduxjs/toolkit";

export const tableSlice = createSlice({
  name: 'table',
  initialState: {value: JSON.parse(localStorage.getItem('card_data')) || []},
  reducers: {
    addCardAction: (state, action) => {  
      state.value.push(action.payload);
      localStorage.setItem('card_data', JSON.stringify(state.value))
    },
    removeCardAction: (state, action) => {
      state.value = state.value.filter(elem => elem.id !== action.payload);
      if (state.value.length) {
        localStorage.setItem('card_data', JSON.stringify(state.value))
      } else {
        localStorage.clear()
      }
    }
  },
})

export const {addCardAction, removeCardAction} = tableSlice.actions;

export default tableSlice.reducer;