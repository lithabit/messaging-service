const Queue = require('./queue')()
const sendMail = require('../../mailTransporter')
const logger = require('../../logger')

module.exports = ({ id, data }) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { recipient, subject, content } = data
        const sendingEmail = await sendMail(recipient, subject, content)
        if (sendingEmail) {
          logger.info(`Success send email to ${recipient} with id ${id} and subject ${subject}`)
          resolve()
        } else {
          logger.error(`Failed send email to ${recipient} with id ${id} and subject ${subject}`)
          Queue.add(data, {
            delay: 20 * 60 * 1000,   // if error, queue will send back after 20 minutes from now
            priority: 1,
            removeOnComplete: true,
            removeOnFail: true
          })
          Queue.getDelayedCount()
            .then(result => {
              logger.info(`Sending Email queue delay : ${JSON.stringify(result)}`)
              resolve()
            })
            .catch(() => resolve())
        }
      } catch (error) {
        reject(error)
      }
    }, 60 * 1000)
  })
}