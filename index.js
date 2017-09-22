const findPageLink = require("./src/findPageLink")
const findPost = require("./src/findPost")
const firebaseNodeLifeTrick = require("./src/updateToFirebase")
const infoAwait = require("./src/infoAwait")

const run = async function(){
  const homepage = "http://lifetricks.com";
  // Info we are finding page link
  const pageLink = await infoAwait(findPageLink, homepage, `[INFO] Finding page link...`)
  
  for(let i = pageLink.startNumPage; i <= pageLink.lastNumPage; i++){
    const url = `${pageLink.restUrl[0]}${i}${pageLink.restUrl[1]}`;
    const posts = await infoAwait(findPost, url, `[INFO] Crawling at: ${url}`)
    console.log(`[INFO] See ${posts.length} posts`)
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
