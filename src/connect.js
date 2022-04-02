const PORT = process.env.port || 8000;
const {Pool} = require('pg')

const pool = new Pool ({
   "connectionString": "postgres://egpuyksc:Y8cRYxBUOmXwJ2y_xcmz5Lcif8QHoPxf@manny.db.elephantsql.com/egpuyksc"
})

module.exports = {PORT, pool}