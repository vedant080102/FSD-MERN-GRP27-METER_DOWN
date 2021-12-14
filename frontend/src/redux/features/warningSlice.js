import { createSlice } from '@reduxjs/toolkit'

export const warningSlice = createSlice({
  name: 'warning',
  initialState: {
    warning:null
  },
  reducers: {
    setWarning: (state,action) => {
        state.warning = action.payload
    },
    unSetWarning:(state) => {
        state.warning = null
    }
  }
})

export const { setWarning, unSetWarning } = warningSlice.actions

export default warningSlice.reducer

