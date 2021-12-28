import { NextFunction, Response, Request } from "express";
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import * as yup from 'yup'

export function globalErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (!error) {
    next()
  }

  if (error instanceof yup.ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
}
