const port = Number(process.env.PORT) || 3000
const mailingSenderEmail = process.env.MAILING_SENDER_EMAIL
const mailingSenderPassword = process.env.MAILING_SENDER_PASSWORD
const mailingSenderName = process.env.MAILING_SENDER_NAME

module.exports = {
  port,
  mailer: {
    email: mailingSenderEmail,
    password: mailingSenderPassword,
    name: mailingSenderName
  }
}