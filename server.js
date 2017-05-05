const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()


app.set('view engine', 'ejs');

app.use(express.static('public'))

app.use((request, response, next) => {
  response.locals.query = ''
  next()
})


app.get('/', (request, response) => {
  database.getContacts(function(contacts){
    response.render('index', { contacts })
  })
})


app.get('/contacts/:contactId', (request, response) => {
  const contactId = request.params.contactId
  database.getContact(contactId, function(contact){
    response.render('show', { contact })
  })
})


app.get('/contacts/:contactId/delete', (request, response) => {
  const contactId = request.params.contactId
  database.deleteContact(contactId, function(){
    response.redirect('/')
  })
})

app.get('/search', (request, response) => {
  const query = request.query.q
  database.searchForContact(query, function(contacts){
    response.render('index', { query, contacts })
  })
})



const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
