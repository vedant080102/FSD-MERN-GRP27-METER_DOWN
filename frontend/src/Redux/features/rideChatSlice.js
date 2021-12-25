import { createSlice } from '@reduxjs/toolkit'

export const rideChatSlice = createSlice({
  name: 'rideChat',
  initialState: {
    rideChat: null,
  },
  reducers: {
    setDetails: (state, action) => {
      state.rideChat = action.payload
    },
    resetDetails: (state) => {
      state.rideChat = null
    }
  }
})

export const { setDetails, resetDetails } = rideChatSlice.actions

export default rideChatSlice.reducer