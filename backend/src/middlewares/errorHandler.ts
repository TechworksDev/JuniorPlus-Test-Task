import type e from 'express';

export const errorHandler: e.ErrorRequestHandler = (err, _req, res, _next) => {
  const message = err instanceof Error ? err.message : 'Server error';
  res.status(500).json({ message });
};
