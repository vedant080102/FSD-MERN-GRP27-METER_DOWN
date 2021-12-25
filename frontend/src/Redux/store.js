import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice.js'
import rideChatReducer from './features/rideChatSlice.js'
import journeyAddressesReducer from './features/journeyAddressesSlice.js'

export default configureStore({
  reducer: {
    user: userReducer,
    rideChat: rideChatReducer,
    journeyAddresses: journeyAddressesReducer,
  }
})