import { RequestHandler } from 'express';

const logger = (): RequestHandler => (req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export default logger;
