// const { setQueues, BullAdapter } = require('bull-board')
// const { createBullBoard } = require('@bull-board/api')
// const { BullAdapter } = require('@bull-board/api/bullAdapter')
const logger = require('../logger')
const mailerQueue = require('./mailer/queue')()
const sendMailQueue = require('./mailer')

// setQueues([
//   new BullAdapter(mailerQueue)
// ])

// const { setQueues } = createBullBoard({
//   queues: [
//     new BullAdapter(mailerQueue)
//   ]
// })

mailerQueue.process(async (job, done) => {
  try {
    const { id, data } = job
    logger.info(`Mailer Queue on running with id ${id} , email ${data.recipient}, and subject ${data.subject}`)
    await sendMailQueue({ id, data })
    return done(null)
  } catch (error) {
    return done(error)
  }
})

const checkQueue = async () => {
  try {
    const arrPromises = [
      mailerQueue.getJobCounts(),
      mailerQueue.getDelayedCount()
    ]
    const data = await Promise.all(arrPromises)
    logger.info(`job for email queue ${ data[0] ? JSON.stringify(data[0]) : 0 }`)
    logger.info(`delay for email queue ${ data[1] ? JSON.stringify(data[1]) : 0 }`)
  } catch (error) {
    logger.error(`An error occured while check queue`)
  }
}

checkQueue().then(console.log('\n'))

module.exports = {
  mailerQueue
}