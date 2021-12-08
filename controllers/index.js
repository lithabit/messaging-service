const logger = require("../helpers/logger")
const { mailerQueue } = require("../helpers/queue")

class Controller {
  static async sendEmail (req, res, next) {
    try {
      const { recipient, subject, content } = req.body
      if (!recipient || !subject || !content) {
        next({
          code: 400,
          message: `'recipient', 'subject', 'content' can't be empty !`
        })
      } else {
        mailerQueue.add({
          recipient,
          subject,
          content
        }, {
          removeOnComplete: true,
          removeOnFail: true
        })
        res.status(200).json({ message: 'Waiting queue to sending message !'})
      }
    } catch (error) {
      logger.error(`sendEmail(): ${error.message}`)
      next(error)
    }
  }

  static async sendMultiEmail (req, res, next) {
    try {
      const { recipients, subject, content } = req.body
      if (!recipients || !recipients.length || !subject || !content) {
        next({
          code: 400,
          message: `'recipients', 'subject', 'content' can't be empty !`
        })
      } else {
        recipients.forEach(recipient => {
          mailerQueue.add({
            recipient,
            subject,
            content
          }, {
            removeOnComplete: true,
            removeOnFail: true
          })
        })
        res.status(200).json({ message: 'Waiting queue to sending message !'})
      }
    } catch (error) {
      logger.error(`sendMultiEmail(): ${error.message}`)
      next(error)
    }
  }
}

module.exports = Controller