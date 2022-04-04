import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { prisma } from '../../../utils/prisma';
import { checkPassword } from '../../../utils/bcrypt';

const options = {
    session: false,
    usernameField: 'email' 
};

const localLogin = new LocalStrategy(
    options,
    async (email, password, callback) => {
        const selectedUser: any = await prisma.user.findUnique({
            where: {
                email: email,
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
