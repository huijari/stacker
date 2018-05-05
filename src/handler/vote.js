const { incrementCounter, getLastVote, getOriginal } = require('../data')

const timelimit = 1000 * 15

const vote = async ({ from, message, reply }) => {
  const fileId = await getOriginal(message.sticker.file_id)
  const lastVote = await getLastVote(fileId, from.id)

  const now = new Date()
  if (lastVote && now - lastVote < timelimit)
    return

  incrementCounter(fileId, from.id)
}

module.exports = vote
