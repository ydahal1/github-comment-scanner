const { format, createLogger, transports } = require('winston')
const { timestamp, combine, printf } = format

// Log Format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} | ${level}: ${stack || message}`
})

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'warn',
  format: combine(
    format.colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  defaultMeta: { service: 'github-caption-api' },
  transports: [new transports.Console()]
})

module.exports = logger
