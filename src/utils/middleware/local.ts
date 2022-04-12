import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

import { loginSchema } from '../joi';

const validateLoginRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0] });
    }

    next();
}

const callPassportLocal = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(422).send(info);
        }

        req.user = user;

        return next();
    })(req, res, next);
};

export const verifyLogin = (req: Request, res: Response, next: NextFunction) => {
    validateLoginRequest;
    callPassportLocal;
    return next();
}