const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${level}: ${timestamp} [message]: ${message}`;
});


const logger = createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), myFormat),
  transports: [
    new transports.File({ filename: __dirname + '/error.log', level: 'error' }),
    new transports.File({ filename: __dirname + '/warn.log', level: 'warn' }),
    new transports.File({ filename: __dirname + '/info.log' }),
  ],
  handleExceptions: [
    new transports.File({ filename: __dirname + '/exceptions.log' })
  ]
});


if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    handleExceptions: true,
    format: format.combine(timestamp(), format.colorize(), myFormat),
  }));
}

module.exports = logger;