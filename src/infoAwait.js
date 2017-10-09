const logWithInfo = require("./logWithInfo")
const logErrMsg = require("./logExactErrMsg")
const log = require("single-line-log").stdout

const infoAwait = async (callback, args, taskName = "No task name") => {
  console.time(taskName);
  logWithInfo(taskName)
  let count = 0;
  const limit = 50;
  const timeId = setInterval(() => {
    count++;
    if(count > limit) count = 0
    const percent = Math.floor(count/limit*100)
    const percentStr = Array(count + 1).join("#")
    log(`[${percent}%]`, percentStr)
  }, 1000)
  try {
    const result = await callback(args)
    console.log("")
    console.timeEnd(taskName);
    return result
  }catch(err){
    logErrMsg(err)
  }finally {
    clearInterval(timeId)
    log.clear()
  }
}

var exports = module.exports = infoAwait