import express from 'express'
const router = express.Router();
import Sql from '../SQL.js'


const messageDb = new Sql('message');
const productDb = new Sql('product')


router.get('/', async (_req, res, next) => {
    try {
        const listaMensajes = await messageDb.getAll();
        const listaProductos = await productDb.getAll();
        res.status(200).render('index', {
        productos: listaProductos,
        mensajes: listaMensajes
    })}
    catch(err){
        next(err)
    }
});

export default router;