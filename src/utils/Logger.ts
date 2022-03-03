import { addColors, createLogger, format, transports } from 'winston';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  modules: 3,
  modwarn: 4,
  modinfo: 5,
  debug: 6,
};

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  modules: 'cyan',
  modwarn: 'yellow',
  modinfo: 'green',
  debug: 'blue',
});

const logger = createLogger({
  levels: logLevels,
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.timestamp()),
    }),
  ],
  format: format.combine(
    format.colorize(),
    format.padLevels({ levels: logLevels }),
    format.timestamp(),
    format.printf((info) => `${info.timestamp} ${info.level}:${info.message}`),
  ),
  level: 'debug',
});

export default logger;
