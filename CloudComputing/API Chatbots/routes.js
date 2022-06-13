const { MessageHandler } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/chat',
    handler: MessageHandler
  }
]

module.exports = routes
