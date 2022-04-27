import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth';
import followRouter from './routes/follow';
import locationRouter from './routes/location';
import ratingRouter from './routes/rating';
import profileRouter from './routes/profile';

import { SERVER_MESSAGES, ROUTES } from './utils/config';

const app = express();

const PORT = process.env.PORT || 4000;

const corsOptions = {
    origin: ['http://localhost:3000', 'https://spontaneously-nomadic-client.herokuapp.com', 'spontaneously-nomadic-client.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(passport.initialize());

app.use(ROUTES.AUTH, authRouter);
app.use(ROUTES.LOCATION, locationRouter);
app.use(ROUTES.RATING, ratingRouter);
app.use(ROUTES.PROFILE, profileRouter);
app.use(ROUTES.FOLLOW, followRouter);

app.get('*', (req, res) => {
    res.send(SERVER_MESSAGES.HELLO);
});

app.listen(PORT, () => {
    console.log(`${SERVER_MESSAGES.STARTED} ${PORT}`);
});
