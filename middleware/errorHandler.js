module.exports = (err, req, res, next) => {
  if (err.code && err.message) {
    res.status(err.code).json({ message: err.message })
  } else {
    res.status(500).json({ message: error?.message || 'Internal Server Error' })
  }
}