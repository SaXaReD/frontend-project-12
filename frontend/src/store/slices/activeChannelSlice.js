import { createSlice } from '@reduxjs/toolkit'

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState: {
    activeChannelId: '1',
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
