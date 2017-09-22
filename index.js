const findPageLink = require("./src/findPageLink")
const findPost = require("./src/findPost")
const firebaseNodeLifeTrick = require("./src/updateToFirebase")

const run = async function(){
  const homepage = "http://lifetricks.com";
  let pageLink = await findPageLink(homepage)
  pageLink = {
    restUrl: ["http://lifetricks.com/page/", "/"],
    startNumPage: 2,
    lastNumPage: 3,
  }
  console.log("Override for test", pageLink)
  for(let i = pageLink.startNumPage; i <= pageLink.lastNumPage; i++){
    const url = `${pageLink.restUrl[0]}${i}${pageLink.restUrl[1]}`;
    const posts = await findPost(url)
    await firebaseNodeLifeTrick(posts)
  }
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
