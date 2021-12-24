import { createSlice } from '@reduxjs/toolkit'

export const journeyAddressesSlice = createSlice({
  name: 'addresses',
  initialState: {
    addresses: null,
  },
  reducers: {
    setAddresses: (state,action) => {
        state.addresses = action.payload
    },
    resetAddresses:(state)=>{
        state.addresses = null
    }
  }
})

export const { setAddresses, resetAddresses } = journeyAddressesSlice.actions

export default journeyAddressesSlice.reducer