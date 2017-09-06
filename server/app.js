import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import webpack from 'webpack';
import socket from 'socket.io';
import { createServer } from 'http';
import webpackMiddleware from 'webpack-dev-middleware';
import routes from './routes/index';
import webpackConfig from '../webpack.config';


env.config();
const app = express();
const server = createServer(app);
const io = socket(server);
const port = process.env.PORT || 3000;


// Middlewares used
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  next();
});

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/', routes);

app.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});
<<<<<<< HEAD
app.listen(port, () => {
=======
server.listen(port, () => {
>>>>>>> code clean-up in app.js file
  console.log(`Listening on port ${port} in ${app.get('env')}`);
});
SocketController.init(io);
export default server;

