let timeId;
const loading = {
  start(){
    timeId = setTimeout(() => console.log(`[INFO] ...`), 1000)
  },
  end(){
    if(timeId){
      clearTimeout(timeId)
    }
  }
}

const infoAwait = async (callback, args, taskName) => {
  console.log(taskName)
  loading.start()
  const result = await callback(args)
  loading.end()
  return result
}

var exports = module.exports = infoAwait