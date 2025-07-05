import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import channelsReducer from './channelSlice';
import messagesReducer from './messageSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});

export default store;