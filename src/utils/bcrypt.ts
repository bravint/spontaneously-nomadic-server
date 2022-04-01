import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string) => bcrypt.hashSync(password, saltRounds);

export const checkPassword = async (textPassword: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(textPassword, hashedPassword);
    } catch (error) {
        return error;
    }
};
