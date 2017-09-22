const findPageLink = require("./src/findPageLink")
const firebaseNodeLifeTrick = require("./src/updateToFirebase")

const run = async function(){
  const homepage = "http://lifetricks.com";
  const pageLink = await findPageLink(homepage)
  console.log(pageLink)
  firebaseNodeLifeTrick.push({name: "anh"})
}


const handle = async () => {
  try{
    await run()
  }catch(err){
    let shouldLog = err
    if(typeof err === "object" && err.message)
      shouldLog  = err.message
    console.log(shouldLog)
  }
  // Auto re run
  setTimeout(handle, 6000)
}

handle()
