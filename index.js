const {find} = require("./src/findPageLink")

const run = async function(){
  const homepage = "http://lifetricks.com";
  const pageLink = await find(homepage)
  console.log(pageLink)
}

run()