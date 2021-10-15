const log4js = require('log4js');

log4js.configure({
  appenders: {
    debug: {
      type: 'file',
      filename: 'log/debug.log',
      layout: {
        type: 'pattern',
        pattern: '%d - %c:[%p]: %m',
      },
      pattern: 'yyyy-MM-dd-hh',
      alwaysIncludePattern: true,
      numToKeep: 3,
      backups: '3',
    },
  },
  categories: {
    default: {
      appenders: ['debug'],
      level: 'debug',
    },
  },
});

export const logger = log4js.getLogger('debug');
