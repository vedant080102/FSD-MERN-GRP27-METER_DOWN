import {createSlice} from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: null,
  },
  reducers: {
    adminLogin: (state, action) => {
      state.admin = action.payload
    },
    adminLogout: (state) => {
      state.admin = null
    }
  }
})

export const {
  adminLogin,
  adminLogout
} = adminSlice.actions

export default adminSlice.reducer