const { createLogger, format, transports, addColors } = require('winston');

const logConfig = {
  transports: [
    new transports.Console({
      format: format.combine(
        // addColors({ allColors: true}),
        // format.prettyPrint({ colorize: true }),
        format.colorize({ all: true }),
        format.json(),
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.printf(info => `${info.level}:  ${info.timestamp}: ${info.message}`),
      )
    }),
  ]
};

module.exports = createLogger(logConfig);