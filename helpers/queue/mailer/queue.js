const Queue = require('bull')

module.exports = () => {
  return new Queue(`${process.env.NODE_ENV}_mailer`)
}