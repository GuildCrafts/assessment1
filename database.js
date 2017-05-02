const pg = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/contacts'
const client = new pg.Client(connectionString)
client.connect()

const query = function(sql, callback){
  console.log('QUERY -> ', sql)
  client.query(sql).on('end', function(result){
    console.log('QUERY <- ', result.rows)
    callback(result.rows)
  })
}

const getContacts = function(callback){
  query(`
    SELECT
      *
    FROM
      contacts
  `, callback)
}

const getContact = function(contactId, callback){
  query(`
    SELECT * FROM contacts WHERE id=${contactId} LIMIT 1
  `, function(results){
    callback(results[0])
  })
}

const deleteContact = function(contactId, callback){
  query(`
    DELETE FROM
      contacts
    WHERE
      id=${contactId}
  `, callback)
}

const searchForContact = function(searchQuery, callback){
  searchQuery = `%${searchQuery.toLowerCase().replace(/\s+/,'%')}%`
  query(`
    SELECT
      *
    FROM
      contacts
    WHERE
      lower(first_name || ' ' || last_name) LIKE '${searchQuery}'
  `, callback)
}

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  searchForContact,
}
