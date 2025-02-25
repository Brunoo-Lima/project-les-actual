import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Error) {
    res.status(400).json({
      // Todo erro externo a aplicação cai nesse if
      error: err.message,
    });
  }

  res.status(500).json({
    // Erros internos retonam 500
    status: 'error',
    message: 'Internal Server Error',
  });
};

export default errorHandler;
