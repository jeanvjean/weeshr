/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as winston from 'winston';
// import {PapertrailConnection, PapertrailTransport} from 'winston-papertrail';  //=======activate when a paper trail is set======

// const papertrailConnection = new PapertrailConnection({  //======activate when a paper trail is set=====
//   host: `${process.env.TONOTE_PAPERTRAIL_URL}`.split('\r')[0],
//   port: process.env.TONOTE_PAPERTRAIL_PORT,
//   hostname: 'tonote-backend',
// });

const transports = (level: any, maxFiles: any) => [
  new winston.transports.Console({
    level,
    handleExceptions: true,
    // @ts-ignore
    json: false,
    colorize: true,
  }),
  new winston.transports.File({
    level: 'info',
    filename: './server.log',
    handleExceptions: true,
    // @ts-ignore
    json: true,
    maxsize: 5242880,
    maxFiles,
    colorize: true,
  }),
//   new PapertrailTransport(papertrailConnection, {hostname: 'admin-tonote-backend'}), ======activate when a paper trail is set=====
];

const live = (level: any, maxFiles: any) => winston.createLogger({
  transports: transports(level, maxFiles),
  exitOnError: false,
});

const defaultLogger = {
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      // @ts-ignore
      json: false,
      colorize: true,
    }),
    // new PapertrailTransport(papertrailConnection, {hostname: 'admin-tonote-backend'}), ======activate when a paper trail is set=====
  ],
  exitOnError: false,
};

const getLogger = (env: any) => {
  switch (env) {
  case 'production': return live('error', 100);

  case 'staging': return live('error', 100);

  case 'development': return live('debug', 6);

  // eslint-disable-next-line new-cap
  // @ts-ignore
  default: return new winston.createLogger(defaultLogger);
  }
};

const logger = (env: any) => {
  let ret = '';

  ret = getLogger(env);

  // @ts-ignore
  ret.stream = {
    write: (message: any /* encoding */) => {
      // @ts-ignore
      logger.info(message);
    },
  };

  return ret;
};

export default logger;
