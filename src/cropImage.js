const Jimp = require("jimp")
const fs = require("fs")
const {promisify} = require('util');


const jimpReadImg = promisify(Jimp.read)

const fileNameFromUrl = imgUrl => imgUrl.match(/(.+)\/(.+)$/i)[2]

const cropImage = async imgUrl => {
  const img = await jimpReadImg(imgUrl)
  const fileName = fileNameFromUrl(imgUrl)
  const {width, height: curr} = img.bitmap
  const height = curr - 300;
  await img.crop(0, 0, width, height)
  const filePath = `${__dirname}/${fileName}`
  await new Promise(resolve => img.write(`${__dirname}/${fileName}`, resolve))
  return {
    filePath,
    cleanFile: () => fs.unlinkSync(filePath)
  }
}

// (async () => {
//   const imgUrl = "https://storage.googleapis.com/glass-turbine-148103.appspot.com/zombie-949916_640.jpg"
//   const {filePath, cleanFile} = await cropImage(imgUrl)
//   console.log(filePath)
//   cleanFile()
// })()

module.exports = cropImage