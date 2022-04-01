import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { prisma } from '../../../utils/prisma';
import { checkPassword } from '../../../utils/bcrypt';

const options = {
    session: false,
};

const localLogin = new LocalStrategy(
    options,
    async (username, password, callback) => {
        const selectedUser: any = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!selectedUser) {
            return callback('error');
        }

        const checkedPassword = checkPassword(password, selectedUser.password);

        if (!checkedPassword) {
            return callback('error');
        }

        callback(null, selectedUser);
    }
);

passport.use(localLogin);
