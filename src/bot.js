const Telegraf = require('telegraf')

const { setup, vote } = require('./handler')

function start() {
  const bot = new Telegraf(process.env['BOT_TOKEN'])

  bot.command('/setup', setup)
  bot.on('sticker', vote)

  if (process.env['HOOK_URL']) {
    bot.telegram.setWebhook(`${process.env['HOOK_URL']}/stacker`)
    bot.startWebhook('/stacker', null, process.env['PORT'])
  } else
    bot.startPolling()
}

module.exports = start
