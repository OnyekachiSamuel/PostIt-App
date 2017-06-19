import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
// import session from 'session';
import cookieParser from 'cookie-parser';


// import path from 'path';
import routes from './routes/index';

// import Apicontroller from './controllers/controller';


const app = express();
const port = process.env.port || 3000;


// Middlewares used
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({ secret: process.env.SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});





app.use('/', routes);
app.use('/api/', routes);
app.listen(port, () => {
  console.log('Listening on port 3000');
});







