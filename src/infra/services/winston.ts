import winston from 'winston'

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      handleRejections: true,
      handleExceptions: true,
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'app-error.log',
      dirname: 'log',
      handleRejections: true,
      handleExceptions: true,
    }),
  ],
})
