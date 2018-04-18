const Telegraf = require('telegraf')

const { setup } = require('./handler')

function start() {
  const bot = new Telegraf(process.env['BOT_TOKEN'])

  bot.command('/setup', setup)

  bot.startPolling()
}

module.exports = start
