const admin = require("firebase-admin");
// Fetch the service account key JSON file contents
const serviceAccount = require("./.credential/glass-turbine-148103-firebase-adminsdk-n0gsz-0503c65cb3.json");
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://glass-turbine-148103.firebaseio.com/"
});
// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();
const firebaseNodeLifeTrick = db.ref("nodeLifeTrick");

var exports = module.exports = firebaseNodeLifeTrick