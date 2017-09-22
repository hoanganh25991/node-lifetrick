const findPageLink = require("./src/findPageLink")
const findPost = require("./src/findPost")
const updateToFirebase = require("./src/updateToFirebase")
const infoAwait = require("./src/infoAwait")
const logWithInfo = require("./src/logWithInfo")
const logExactErrMsg = require("./src/logExactErrMsg")

const run = async function(){
  const homepage = "http://lifetricks.com";
  // Info we are finding page link
  const pageLink = await infoAwait(findPageLink, homepage, `Finding page link...`)
  for(let i = pageLink.startNumPage; i <= pageLink.lastNumPage; i++){
    const url = `${pageLink.restUrl[0]}${i}${pageLink.restUrl[1]}`;
    try{
      const posts = await infoAwait(findPost, url, `Crawling at: ${url}`)
      logWithInfo(`See ${posts.length} posts`)
      await updateToFirebase(posts)
    }catch(err){
      logExactErrMsg(err)
    }
  }
}

const crawling = async () => {
  try{
    await run()
  }catch(err){
    logExactErrMsg(err)
  }finally{
    // Auto re run
    // setTimeout(crawling, 6000)
    logWithInfo("==============COMPLETE CRAWLING LIFETRICKS==============")
    process.exit();
  }
}

// Ok, start
crawling()
