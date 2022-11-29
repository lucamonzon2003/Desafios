import knexConfig from './services/database/config.js';
import knex from 'knex';
import { v4 as uuidv4 } from 'uuid';

class Sql {

    constructor(table) {
        this.knex = knex(knexConfig)
        this.table = table
    }

    async save(obj) {
        try {
            this.knex.initialize();
            Object.assign(obj, {
                code: uuidv4()
            })
            await this.knex(this.table).insert(obj)
            return obj
        } catch (err) {
            console.error(err);
            return {
                succes: false,
                messsage: err.messsage
            }
        } finally {
            await this.knex.destroy();
        }
    }

    async getByCode(code) {
        try {
            this.knex.initialize();
            const data = await this.knex(this.table).select('*').where('code', '=', code);
            if (data.length == 0) {
                return {
                    succes: false,
                    message: 'Not found'
                }
            }
            return data
        } catch (err) {
            console.error(err);
            return {
                succes: false,
                messsage: err.messsage
            }
        } finally {
            await this.knex.destroy();
        }
    }

    async getAll() {
        try {
            this.knex.initialize();
            const data = await this.knex(this.table).select('*')
            return data;

        } catch (err) {
            console.error(err);
            return {
                succes: false,
                messsage: err.messsage
            }
        } finally {
            await this.knex.destroy();
        }

    }

    async update(code, obj) {
        try {
            this.knex.initialize();
            await this.knex(this.table).update(obj).where('code', '=', code)
            console.info(`${code} was update`)
        } catch (err) {
            console.error(err);
            return {
                succes: false,
                messsage: err.messsage
            }
        } finally {
            await this.knex.destroy();
        }
    }

    async deleteByCode(code) {
        try {
            this.knex.initialize();
            await this.knex(this.table).where('code', '=', code).del()
            console.info(`${code} was delete`)
        } catch (err) {
            console.error(err);
            return {
                succes: false,
                messsage: err.messsage
            }
        } finally {
            await this.knex.destroy();
        }
    }

}

// const test = new Sql('message');

// const a = async () => {
//     console.log(await test.getAll());
//     // console.log(await test.getByCode())
//     console.log(await test.save({ mensaje: 'hola', fyh: '1/1/11', mail: '123@gmail.com' }))
// }

// a()

export default Sql;