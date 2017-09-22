const findPageLink = require("./src/findPageLink")

const run = async function(){
  const homepage = "http://lifetricks.com";
  const pageLink = await findPageLink(homepage)
  console.log(pageLink)
}

run()