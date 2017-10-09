const admin = require("firebase-admin");
// Fetch the service account key JSON file contents
const serviceAccount = require("./.credential/glass-turbine-148103-firebase-adminsdk-n0gsz-f4c7be2350.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://glass-turbine-148103.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();

const cropImage = require("./cropImage")
const saveToCloudStorage = require("./saveToCloudStorage")
const bucketName = "glass-turbine-148103.appspot.com"

/**
 * Update to nodeLifeTrick2 post & category
 * Base on post content after crawling
 *
 * @param {Object} postWithCategory
   {
     postId: <number>,
     imgUrl: <string>,
     category: <string>
   }
 */
const updateSinglePostWithCategory = async(postWithCategory) => {
  // Find if post exist
  const {postId, imgUrl, category:categoryName} = postWithCategory
  const refToCategories = db.ref("nodeLifeTrick2/categories")
  const sameCategory = await new Promise(resolve => {
    refToCategories
      .orderByChild("name")
      .equalTo(categoryName)
      .limitToFirst(1)
      .once("value", function(snapshot) {
        resolve(snapshot.val())
      })
  })

  const categoryKey = sameCategory ? Object.keys(sameCategory)[0] : refToCategories.push().key;
  console.log(`[INFO] Updating categoryKey: ${categoryKey}`)
  await db.ref(`nodeLifeTrick2/categories/${categoryKey}`).update({name: categoryName})

  const refToPosts = db.ref("nodeLifeTrick2/posts")
  const samePost = await new Promise(resolve => {
    refToPosts
      .orderByChild("postId")
      .equalTo(postId)
      .limitToFirst(1)
      .once("value", function(snapshot) {
        resolve(snapshot.val())
      })
  })
  const postKey = samePost ? Object.keys(samePost)[0] : refToPosts.push().key;

  console.log(`[INFO] Saving to cloud storage postImg`)
  const {fileName, cleanFile} = await cropImage(imgUrl)
  const myImgUrl = await saveToCloudStorage(bucketName, fileName)
  console.log(`[INFO] Storage url: ${myImgUrl}`)
  cleanFile()

  console.log(`[INFO] Updating postKey: ${postKey}`)
  await db.ref(`nodeLifeTrick2/posts/${postKey}`).update({postId, imgUrl: myImgUrl, categoryId: categoryKey})
}

const updateManyPostWithCategorys = async (postWitchCategorys) => {
  await postWitchCategorys.reduce(async (carry, postWithCategory) => {
    await carry
    return updateSinglePostWithCategory(postWithCategory)
  }, "Start updating postWithCategorys")
}

var exports = module.exports = updateManyPostWithCategorys