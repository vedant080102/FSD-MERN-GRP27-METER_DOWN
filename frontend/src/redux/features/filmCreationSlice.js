import { createSlice } from '@reduxjs/toolkit'

export const filmCreationSlice = createSlice({
  name:'user_account',
  initialState: {
    filmCreation:null
  },
  reducers: {
    filmCreationpageMount:(state,action)=>{
        state.filmCreation = action.payload
      },
    filmCreationpageUnmount:(state)=>{
    state.filmCreation = null
    }
  }
})

export const { filmCreationpageMount, filmCreationpageUnmount } = filmCreationSlice.actions

export default filmCreationSlice.reducer

