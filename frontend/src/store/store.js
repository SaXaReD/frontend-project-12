import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import modalReducer from './slices/modalSlice'
import activeChannelReducer from './slices/activeChannelSlice'
import { chatApi } from './services/chatApi'

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    activeChannel: activeChannelReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(chatApi.middleware),
})

export default store
