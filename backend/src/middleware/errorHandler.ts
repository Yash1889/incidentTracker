import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Validation Error',
            // @ts-ignore
            details: err.errors,
        });
    }

    res.status(500).json({
        error: 'Internal Server Error',
        message: err instanceof Error ? err.message : 'Unknown error',
    });
}
