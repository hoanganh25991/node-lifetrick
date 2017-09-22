const findPageLink = require("./src/findPageLink")
const findPost = require("./src/findPost")
const firebaseNodeLifeTrick = require("./src/updateToFirebase")

const run = async function(){
  const homepage = "http://lifetricks.com";
  const pageLink = await findPageLink(homepage)
  console.log(pageLink)
  const url = pageLink.restUrl[0] + pageLink.startNumPage + pageLink.restUrl[1];
  const posts = await findPost(url)
  console.log(posts)
  firebaseNodeLifeTrick.push(posts)
}


const handle = async () => {
  try{
    await run()
  }catch(err){
    let shouldLog = err
    if(typeof err === "object" && err.message) shouldLog  = err.message
    console.log(shouldLog)
  }finally{
    // Auto re run
    // setTimeout(handle, 6000)
    process.exit();
  }
}

handle()
