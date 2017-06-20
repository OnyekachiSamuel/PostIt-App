import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import env from 'dotenv';
// import path from 'path';
import routes from './routes/index';

env.config();
const app = express();
const port = process.env.port || 3000;


// Middlewares used
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
app.use('/api/', routes);
app.listen(port, () => {
  console.log('Listening on port 3000');
});

export default app;






