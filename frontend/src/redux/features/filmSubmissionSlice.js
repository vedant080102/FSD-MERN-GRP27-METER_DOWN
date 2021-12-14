import { createSlice } from '@reduxjs/toolkit'

export const filmSubmissionSlice = createSlice({
  name:'user_account',
  initialState: {
    filmSubmission:null
  },
  reducers: {
    filmSubmissionpageMount:(state,action)=>{
        state.filmSubmission = action.payload
      },
    filmSubmissionpageUnmount:(state)=>{
    state.filmSubmission = null
    }
  }
})

export const { filmSubmissionpageMount, filmSubmissionpageUnmount } = filmSubmissionSlice.actions

export default filmSubmissionSlice.reducer

