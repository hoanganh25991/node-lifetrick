const findPageLink = require("./src/findPageLink")
const findPost = require("./src/findPost")
const firebaseNodeLifeTrick = require("./src/updateToFirebase")

const run = async function(){
  const homepage = "http://lifetricks.com";
  const pageLink = await findPageLink(homepage)
  console.log(pageLink)
  for(let i = pageLink.startNumPage; i <= pageLink.lastNumPage; i++){
    const url = `${pageLink.restUrl[0]}${i}${pageLink.restUrl[1]}`;
    const posts = await findPost(url)
    posts.forEach(post => {
      const categoryName = post.category;
      const category = firebaseNodeLifeTrick.ref("categories").equalTo(categoryName, "name").once("value",function(snapshot){
        return Promise.resolve(snapshot)
      });
      
      console.log(category)

      firebaseNodeLifeTrick.push(posts)
    })
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
