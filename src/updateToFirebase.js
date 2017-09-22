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

(async() => {
  let categoryName = "hoanganhxxx";
  await db.ref("nodeLifeTrick/categories").push({name: categoryName})
  const category = await new Promise(resolve => {
    db.ref("nodeLifeTrick/categories").orderByChild("name").equalTo(categoryName).once("value",function(snapshot){
      resolve(snapshot.val())
    })
  })
  console.log(category)
  process.exit()
})();

// var exports = module.exports = firebaseNodeLifeTrick