const express = require('express')
const router = express.Router()
const postgresDB = require('../databases/postgres/config.js')

/********************************************************************************************************************* */
// MISSILE APPLICATION ENDPOINTS
/********************************************************************************************************************* */

// Load data into table trajectory_path
router.post(`/write/missile`, (req, res) => {

  data = JSON.stringify(req.body) 
  query = postgresDB.query(`insert into trajectory_path(path_info) values('${data}');`, (error, results) => {
    if (error) {
      res.status(400).send(error.message)
    }
    if (results) {
      res.status(200).send('no missile')
    }
  })
})

// Get the count of the "rows" in table trajectory_path
router.get(`/read/missile`, (req, res) => {

  query = postgresDB.query(`select count(*) from trajectory_path;`, (error, results) => {
    if (error) {
      res.status(400).send(error.message)
    }
    if (results) {
      res.status(200).send(results.rows[0].count)
    }
  })
})

// Clean table trajectory_path
router.post(`/delete/missile`, (req, res) => {

  query = postgresDB.query(`delete from trajectory_path;`, (error, results) => {
    if (error) {
      res.status(400).send(error.message)
    }
    if (results) {
      res.status(200).send('Table trajectory_path clean!')
    }
  })
})
/********************************************************************************************************************* */


/********************************************************************************************************************* */
// CRYPTO APPLICATION ENDPOINTS
/********************************************************************************************************************* */

// Load data into table trajectory_path
router.post(`/write/crypto`, (req, res) => {

  data = JSON.stringify(req.body) 
  query = postgresDB.query(`insert into crypto_tab(bitcoin_info) values('${data}');`, (error, results) => {
    if (error) {
      res.status(400).send(error.message)
    }
    if (results) {
      res.status(200).send('bitcoin info inserted!')
    }
  })
})

// Get the count of the "rows" in table trajectory_path
router.get(`/read/crypto`, (req, res) => {

  query = postgresDB.query(`select count(*) from crypto_tab;`, (error, results) => {
    if (error) {
      res.status(400).send(error.message)
    }
    if (results) {
      res.status(200).send(results.rows[0].count)
    }
  })
})

// Custom query
router.post(`/query/crypto`, (req, res) => {

  query = req.body.query
  query = postgresDB.query(`${query}`, (error, results) => {
    if (error) {
      res.status(400).send(error.message)
    }
    if (results) {
      res.status(200).send(results)
    }
  })
})

/********************************************************************************************************************* */

module.exports = router