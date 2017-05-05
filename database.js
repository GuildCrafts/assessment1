const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost:5432/contacts'
});

const query = function(sql, callback){
  console.log('QUERY -> ', sql)
  client.query(sql).on('end', function(result){
    console.log('QUERY <- ', result.rows)
    callback(result.rows)
  })
}

const getContacts = function(callback) {
  knex('contacts').then(function(rows){
    callback(rows)
  })
}

const getContact = function(contactId, callback){
  knex('contacts').where('id', contactId).then(function(row) {
    callback(row[0])
  })
}

const deleteContact = function(contactId, callback){
  knex('contacts').where('id', contactId).del().then(function(row) {
    callback(row)
  })
}

const searchForContact = function(searchQuery, callback){
  q = '%'+searchQuery.toLowerCase().replace(/\s+/,'%')+'%'
  knex('contacts').whereRaw(`LOWER(first_name || last_name) LIKE ?`, [`%${q}%`])
  .then(function(rows) {
    callback(rows)
  })
}

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  searchForContact,
}
