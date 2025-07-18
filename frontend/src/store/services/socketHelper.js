const addSocketListener = async (
  socket,
  eventType,
  updateCachedData,
  cacheDataLoaded,
  cacheEntryRemoved,
) => {
  try {
    await cacheDataLoaded
    const handleEvent = (payload) => {
      updateCachedData((draft) => {
        switch (eventType) {
          case 'newChannel':
          case 'newMessage':
            draft.push(payload)
            break
          case 'renameChannel': {
            const channel = draft.find(c => c.id === payload.id)
            if (channel) {
              channel.name = payload.name
            }
            break
          }
          case 'removeChannel':
            return draft.filter(c => c.id !== payload.id)
          default:
            break
        }
      })
    }
    socket.on(eventType, handleEvent)

    await cacheEntryRemoved
    socket.off(eventType, handleEvent)
  }
  catch (err) {
    console.log(err)
  }
}

export default addSocketListener
