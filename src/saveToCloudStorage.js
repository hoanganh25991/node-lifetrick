const serviceAccountPath = `${__dirname}/.credential/test-google-api-bfba3eec6bad.json`
const Storage = require('@google-cloud/storage');
const storage = Storage({
  keyFilename: serviceAccountPath
});

// const getPublicUrl = (bucketName, fileName) => `https://${bucketName}.storage.googleapis.com/${fileName}`
const getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`
/*
 https://glass-turbine-148103.appspot.com.storage.googleapis.com/zombie-949916_640.jpg
 */
const makePublic = storage => (bucketName, filename) => {
  return (
    storage
    .bucket(bucketName)
    .file(filename)
    .makePublic()
  )
}

const uploadFile = storage => (bucketName, filename) => {
  return (
    storage
    .bucket(bucketName)
    .upload(filename)
  )
}

const saveToCloudStorage = async (bucketName, fileName) => {
  const filePath = `${__dirname}/${fileName}`
  await uploadFile(storage)(bucketName, filePath)
  await makePublic(storage)(bucketName, fileName)
  const publicUrl = getPublicUrl(bucketName, fileName)
  return publicUrl
}


// (async () => {
//   const bucketName = "glass-turbine-148103.appspot.com"
//   // const fileName = "logWithInfo.js"
//   // const filePath = `${__dirname}/${fileName}`
//   // await uploadFile(storage)(bucketName, filePath)
//   // await makePublic(storage)(bucketName, fileName)
//   const url = await saveToCloudStorage(bucketName, "infoAwait.js")
//   console.log(url)
// })()

module.exports = saveToCloudStorage


