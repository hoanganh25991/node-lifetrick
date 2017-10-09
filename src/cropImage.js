var Jimp = require("jimp");
const imgUrl = "https://storage.googleapis.com/glass-turbine-148103.appspot.com/zombie-949916_640.jpg"
Jimp.read(imgUrl, (err, img) => {
  console.log(img)
  console.dir(img.bitmap.height)
})