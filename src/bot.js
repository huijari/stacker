const Telegraf = require('telegraf')

const { setup, vote } = require('./handler')

function start() {
  const bot = new Telegraf(process.env['BOT_TOKEN'])

  bot.command('/setup', setup)
  bot.on('sticker', vote)

  bot.startPolling()
}

module.exports = start
