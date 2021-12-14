import { createSlice } from '@reduxjs/toolkit'

export const judgeSlice = createSlice({
  name: 'judge',
  initialState: {
    judge: null,
  },
  reducers: {
    judgeLogin: (state,action) => {
        state.judge = action.payload
    },
    judgeLogout:(state)=>{
        state.judge = null
    }
  }
})

export const { judgeLogin, judgeLogout } = judgeSlice.actions

export default judgeSlice.reducer

