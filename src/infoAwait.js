const infoAwait = async (callback, args, taskName = "[INFO] No task name") => {
  console.log(taskName)
  const timeId = setTimeout(() => console.log(`[INFO] ...`), 500)
  const result = await callback(args)
  clearTimeout(timeId)
  return result
}

var exports = module.exports = infoAwait