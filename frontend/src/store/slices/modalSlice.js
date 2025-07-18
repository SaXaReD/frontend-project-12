import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null,
    ChannelId: null,
  },
  reducers: {
    setOpen: (state, { payload }) => {
      const { type, channelId } = payload
      state.type = type
      state.isOpen = true
      state.ChannelId = channelId
    },
    setClose: (state) => {
      state.type = null
      state.isOpen = false
      state.ChannelId = null
    },
  },
})

export const { setOpen, setClose } = modalSlice.actions
export default modalSlice.reducer
