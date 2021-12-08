const nodemailer = require('nodemailer')
const { mailer: { email, password, name } } = require('../../config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
})

module.exports = async (recipient, subject, contentHtml ) => {
  try {
    const mailOptions = {
      from: `${name} <${email}>`,
      to: recipient,
      subject,
      html: contentHtml || ''
    }
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    return false
  }
}