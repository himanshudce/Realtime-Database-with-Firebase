const serviceAccount = require("./key.json");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://advanceddatabaseproject-71055-default-rtdb.europe-west1.firebasedatabase.app"
});

const firebaseDB = admin.database();

module.exports = firebaseDB