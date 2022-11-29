// const path = require('path')

// module.exports = {
//     client: 'sqlite3',
//     connection: {
//         filename: path.resolve(__dirname, '../sqlite/db.sqlite')
//     },
//     useNullAsDefault: true
// }

export default {
    client: 'mysql',
    connection: {
        host: process.env.SQL_HOST || 'localhost',
        user: process.env.SQL_USER || 'root',
        password: process.env.SQL_PASSWORD || '',
        database: process.env.SQL_DATABASE || 'coder'
    },
    // Parsear automaticamente los datos RAW que llegan de la base de datos a su equivalente en ES6
    postProcessResponse: (result, _queryContext) => {
        if (Array.isArray(result)) {
            return result.map(row => {
                return JSON.parse(JSON.stringify(row));
            })
        }
        return JSON.parse(JSON.stringify(result));
    }
}
