const express = require('express')
const app = express()
const {PORT, pool} = require('./connect.js')

app.use(express.json())

app.get('/', async(req, res) => {
   const client = await pool.connect()

   await client.release()
   
   const {rows} = await client.query('select * from items');
   
   res.send(rows)
})
app.post('/newItem', async(req, res) => {
    const client = await pool.connect()

    const {poster, title, date, text, author} = req.body;

   client.release()
   
   const {rows} = await client.query('insert into items(poster, title, release_date, mini_title, author) VALUES($1, $2, $3, $4, $5) RETURNING *', [poster, title, date, text, author]);
   
   res.send('new item')
})
app.put('/updateItem', async(req, res) => {
   const client = await pool.connect()

   const {id, poster, title, date, text, author} = req.body;

  client.release()
  
  const {rows} = await client.query('update items set poster = $2, title = $3, release_date = $4, mini_title = $5, author = $6 where id = $1 RETURNING *', [id, poster, title, date, text, author]);
  
  res.send('update item')
})
app.delete('/deleteItem', async(req, res) => {
   const client = await pool.connect()

   const {id} = req.body;

  client.release()
  
  const {rows} = await client.query('delete from items where id = $1 RETURNING *', [id]);
  
  res.send('delete item')
})

app.listen(PORT, console.log(`server run port ${PORT}`))
