import 'dotenv/config'

import express from 'express'

import _ from 'lodash'

import logger from 'morgan'

import { errorHandler } from './middlewares/errorHandler.js';
import router from './routes/index.routes.js';

import {Server as HttpServer} from 'http';
import {Server as IoServer} from 'socket.io'

const app = express();

const http = new HttpServer(app);
const io = new IoServer(http);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(logger('dev'));

import Sql from './SQL.js'


const messageDb = new Sql('message');
const productDb = new Sql('product')

app.set('view engine', 'ejs');

app.use('/api', router);

app.get('/health', (_req, res, next) => {
    try {
        res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || 'undefined',
        health: 'Up!'
    })}
    catch(err){
        next(err)
    }
});


io.on('connection', async (socket) => {
    console.info('Nuevo cliente conectado')
    socket.on('NEW_MESSAGE_CLI', async message => {
        message.fyh = new Date().toLocaleString();
        await messageDb.save(message);
        console.log(message);
        io.sockets.emit('NEW_MESSAGE_SERVER', message);
    });

    socket.on('NEW_PRODUCT_CLI', async product => {
        await productDb.save(product)
        console.log(product);
        io.sockets.emit('NEW_PRODUCT_SERVER', product);
    });
});


app.use(errorHandler);

export default http;