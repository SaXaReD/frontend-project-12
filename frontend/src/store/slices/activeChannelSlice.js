import { createSlice } from '@reduxjs/toolkit'

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState: {
    activeChannelId: null,
  },
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.activeChannelId = payload
    },
  },
})

export const { setCurrentChannel } = activeChannelSlice.actions
export const selectActiveChannelId = state => state.activeChannel.activeChannelId
export default activeChannelSlice.reducer
