import {NextFunction, Request, Response} from 'express'

export class ValidationError extends Error {}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.log(err);
    res
        .status(err instanceof ValidationError ? 400 : 500)
        .json( {
            message: err instanceof ValidationError ? err.message : 'Sorry, lets try again for the couple of minute later...'
        })
}
