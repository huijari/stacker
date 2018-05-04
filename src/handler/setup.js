const { v4 } = require('uuid')

const { createMeta } = require('../data')
const { toPng } = require('../image')

const setup = async ({ message, from, reply, telegram }) => {
  if (!message.reply_to_message || !message.reply_to_message.sticker)
    return void reply('Please reply to a sticker')

  const { username } = await telegram.getMe()
  const id = v4().replace(/-/g, '')
  const name = `pack_${id}_by_${username}`
  const title = `${message.chat.title}'s Top Stickers`

  const stickerLink = await telegram.getFileLink(
    message.reply_to_message.sticker.file_id
  )
  const source = await toPng(stickerLink)

  const result = await telegram.createNewStickerSet(from.id, name, title, {
    png_sticker: { source },
    emojis: message.reply_to_message.sticker.emoji
  })

  if (result) {
    await createMeta(message.chat.id, name)
    reply(`Success! t.me/addstickers/${name}`)
  }
}

module.exports = setup
