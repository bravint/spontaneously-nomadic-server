import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

import { loginSchema } from '../joi';

export const validateLoginRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0] });
    }

    next();
};

export const callPassportLocal = (req: Request, res: Response, next: NextFunction) => {
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