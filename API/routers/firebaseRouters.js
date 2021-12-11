const express = require('express')
const router = express.Router()
const firebaseDB = require('../databases/firebase/config.js')

/********************************************************************************************************************* */
// MISSILE APPLICATION ENDPOINTS
/********************************************************************************************************************* */

// Load data into node trajectory_path
router.post(`/write/missile`, (req, res) => {

    data = req.body

    const ref = firebaseDB.ref('/trajectory_path');
    ref.push().set(data);

    if (Math.sqrt(Math.pow(data.x,2) + Math.pow(data.x,2))<10)
        res.status(400).send('missile')
    
    res.status(200).send('no missile')
  
})

// Get the count of the children of the node trajectory_path
router.get(`/read/missile`, (req, res) => {

    const ref = firebaseDB.ref().child('/trajectory_path');

    ref.once("value")
    .then(function(snapshot) {
        const count = snapshot.numChildren();
        res.status(200).send(count.toString())
    });
      
})

// Clean DB
router.post(`/delete/missile`, (req, res) => {

    const ref = firebaseDB.ref('/crypto_tab');

    ref.remove();  
    res.status(200).send('DB cleaned!')

})
/********************************************************************************************************************* */


/********************************************************************************************************************* */
// CRYPTO APPLICATION ENDPOINTS
/********************************************************************************************************************* */

// Load data into node trajectory_path
router.post(`/write/crypto`, (req, res) => {

    data = req.body

    const ref = firebaseDB.ref('/crypto_tab');
    ref.push().set(data);
    
    res.status(200).send('bitcoin info inserted!')
  
})

// Get the count of the children of the node trajectory_path
router.get(`/read/crypto`, (req, res) => {

    const ref = firebaseDB.ref().child('/crypto_tab');

    ref.once("value")
    .then(function(snapshot) {
        const count = snapshot.numChildren();
        res.status(200).send(count.toString())
    });
      
})

// Custom queries
// 1
router.post(`/query/crypto/1`, (req, res) => {

    const ref = firebaseDB.ref().child('/crypto_tab');

    ref.once("value")
    .then(function(snapshot) {
        const count = snapshot.numChildren();
        res.status(200).send(count.toString())
    });
      
})

// 2
router.post(`/query/crypto/2`, (req, res) => {

    const ref = firebaseDB.ref('/crypto_tab').orderByChild('Date').limitToLast(100)
    ref.once("value")
    .then(function(snapshot) {
        res.status(200).send(snapshot)
    });

})

// 3
router.post(`/query/crypto/3`, (req, res) => {

    const ref = firebaseDB.ref('/crypto_tab').orderByChild('Date').equalTo('2020-12-31 23:59:00')
    ref.once("value")
    .then(function(snapshot) {
        res.status(200).send(snapshot)
    });

})

// 4
router.post(`/query/crypto/4`, (req, res) => {

    const ref = firebaseDB.ref('/crypto_tab').orderByChild('High').startAfter(3800).endBefore(4500)
    ref.once("value")
    .then(function(snapshot) {
        res.status(200).send(snapshot)
    });

})

// 5
router.post(`/query/crypto/5`, (req, res) => {

    const ref = firebaseDB.ref('/crypto_tab').orderByChild('Volume').startAfter(2)
    ref.once("value")
    .then(function(snapshot) {
        res.status(200).send(snapshot)
    });

})

// Clean DB
router.post(`/delete/crypto`, (req, res) => {

    const ref = firebaseDB.ref('/');

    ref.remove();  
    res.status(200).send('DB cleaned!')

})

// Recursive deletion
router.post(`/delete/crypto/brutal`, (req, res) => {

    const ref = firebaseDB.ref('/crypto_tab')
    ref.once("value")
    .then(function(snapshot) {
        res.status(200).send(snapshot)
    });

})
/********************************************************************************************************************* */


module.exports = router