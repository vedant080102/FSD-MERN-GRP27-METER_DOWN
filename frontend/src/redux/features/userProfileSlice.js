import { createSlice } from '@reduxjs/toolkit'

export const userProfileSlice = createSlice({
  name:'user_account',
  initialState: {
    userProfile:null
  },
  reducers: {
    setUserProfile:(state,action)=>{
        state.userProfile = action.payload
      },
    unsetUserProfile:(state)=>{
    state.userProfile = null
    }
  }
})

export const { setUserProfile, unsetUserProfile } = userProfileSlice.actions

export default userProfileSlice.reducer

