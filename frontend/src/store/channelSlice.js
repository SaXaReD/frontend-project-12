import { createSelector, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    currentChannel: {
      id: 1,
    },
    ...channelsAdapter.getInitialState(),
  },
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      if (state.currentChannel.id === id) {
        state.currentChannel.id = 1;
      }
      channelsAdapter.removeOne(state, id);
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannel.id = payload;
    },
    updateChannelName(state, action) {
      const { id, name } = action.payload;
      const channel = state.entities[id];
      if (channel) {
        channel.name = name;
      }
    },
  },
});

export const {
  setCurrentChannel,
  removeChannel,
  updateChannelName,
  addChannel,
  addChannels,
} = channelSlice.actions;

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);

const selectChannelsEntities = (state) => state.channels.entities;

export const selectExistingChannelNames = createSelector(
  [selectChannelsEntities],
  (channels) => Object.values(channels).map((channel) => channel.name),
);

export default channelSlice.reducer;