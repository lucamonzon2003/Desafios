import knexConfig from '../config.js';
import knex from 'knex'
knex(knexConfig)

knex.schema.createTable('message', table => {
    table.string('mail')
    table.string('fyh')
    table.string('mensaje')
    table.string('code')
}).then(() =>{
    console.info('Table message created');
}).catch(err =>{
    console.error(err);
}).finally(()=>{
    knex.destroy();
});

knex.schema.createTable('product', table => {
    table.string('nombre')
    table.integer('precio')
    table.string('thumbnail')
    table.string('code')
}).then(() =>{
    console.info('Table product created');
}).catch(err =>{
    console.error(err);
}).finally(()=>{
    knex.destroy();
});