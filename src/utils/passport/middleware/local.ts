import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

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
