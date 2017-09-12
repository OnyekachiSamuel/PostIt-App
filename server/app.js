import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import routes from './routes/index';


env.config();
const app = express();

const port = process.env.PORT || 3000;


// Middlewares used
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  next();
});

app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/', routes);

app.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});
app.listen(port, () => {
  console.log(`Listening on port ${port} in ${app.get('env')}`);
});
export default app;
