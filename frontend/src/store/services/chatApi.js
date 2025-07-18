import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { io } from 'socket.io-client'
import addSocketListener from './socketHelper'

const socket = io()

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Channels', 'Messages'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => 'channels',
      providesTags: ['Channels'],
      onCacheEntryAdded: async (
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) => {
        addSocketListener(
          socket,
          'newChannel',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        )
        addSocketListener(
          socket,
          'removeChannel',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        )
        addSocketListener(
          socket,
          'renameChannel',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        )
      },
    }),
    addChannel: builder.mutation({
      query: newChannelName => ({
        url: 'channels',
        method: 'POST',
        body: newChannelName,
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/channels/${id}`,
      }),
      invalidatesTags: ['Channels'],
    }),
    editChannel: builder.mutation({
      query: ({ id, name }) => ({
        method: 'PATCH',
        body: { name },
        url: `/channels/${id}`,
      }),
      invalidatesTags: ['Channels'],
    }),
    getMessages: builder.query({
      query: () => 'messages',
      providesTags: ['Messages'],
      onCacheEntryAdded: async (
        args,
        {
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        },
      ) => {
        addSocketListener(
          socket,
          'newMessage',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
        )
      },
    }),
    addMessage: builder.mutation({
      query: newMessage => ({
        url: 'messages',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Messages'],
    }),
    removeMessage: builder.mutation({
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/messages/${id}`,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useEditChannelMutation,
  useAddMessageMutation,
  useRemoveMessageMutation,
  useGetMessagesQuery,
} = chatApi
