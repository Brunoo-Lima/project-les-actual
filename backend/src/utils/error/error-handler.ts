import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    // Erros conhecidos (ex: erros de validação)
    return res.status(400).json({
      error: err.message,
    });
  }

  // Erros desconhecidos (ex: erros internos do servidor)
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}

export default errorHandler;
