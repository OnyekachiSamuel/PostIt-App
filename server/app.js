import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import env from 'dotenv';
import routes from './routes/index';

env.config();
const app = express();
const port = process.env.PORT || 3000;


// Middlewares used
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'yyuuuatsttgsbbbabbaNNANMSMKWKKZLALLLLZZNZN',
  resave: false,
  saveUninitialized: true
}));

app.use('/', routes);
app.use('/api/', routes);
app.listen(port);

export default app;





