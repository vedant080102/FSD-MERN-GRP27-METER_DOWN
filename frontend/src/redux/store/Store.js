import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import filmCreationReducer from '../features/filmCreationSlice'
import filmSubmissionReducer from '../features/filmSubmissionSlice'
import warningReducer from '../features/warningSlice'
import userProfileReducer from '../features/userProfileSlice'
import customJudgingFormReducer from '../features/customJudgingForm'
import judgeReducer from '../features/judgeSlice'
import adminReducer from '../features/adminSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    judge: judgeReducer,
    admin: adminReducer,
    userProfile: userProfileReducer,
    filmCreation: filmCreationReducer,
    filmSubmission: filmSubmissionReducer,
    warning:warningReducer,
    customJudgingForm:customJudgingFormReducer
  }
})