import { createSlice } from '@reduxjs/toolkit'

export const customJudgingFormSlice = createSlice({
  name:'user_account',
  initialState: {
    customJudgingForm:null
  },
  reducers: {
    customJudgingFormpageMount:(state,action)=>{
        state.customJudgingForm = action.payload
      },
    customJudgingFormpageUnmount:(state)=>{
    state.customJudgingForm = null
    }
  }
})

export const { customJudgingFormpageMount, customJudgingFormpageUnmount } = customJudgingFormSlice.actions

export default customJudgingFormSlice.reducer

