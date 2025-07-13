import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter({
  selectId: (message) => message.id,
});

const initialState = messagesAdapter.getInitialState();

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setInitialMessages: messagesAdapter.setAll,
    addOneMessage: messagesAdapter.addOne,
    removeMessagesByChannelId: (state, action) => {
      const channelIdToRemove = action.payload;
      const idsToRemove = Object.values(state.entities)
        .filter((message) => message.channelId === channelIdToRemove)
        .map((message) => message.id);
      messagesAdapter.removeMany(state, idsToRemove);
    },
  },
});

export const {
  setInitialMessages,
  addOneMessage,
  removeMessagesByChannelId,
} = messageSlice.actions;
export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);

const selectAllMessages = selectors.selectAll;

export const getMessagesForChannel = createSelector(
  [selectAllMessages, (state, activeChannelId) => activeChannelId],
  (allMessages, activeChannelId) => allMessages
    .filter((message) => message.channelId === activeChannelId),
);

export default messageSlice.reducer;
