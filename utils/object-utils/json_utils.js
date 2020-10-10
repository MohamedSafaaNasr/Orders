module.exports = {
  convertArrayIntoJson
}

function convertArrayIntoJson(array, key){
  if(!array || !Array.isArray(array) || !key || typeof key !== 'string')
    throw new Error('parameters must be array items, and key as string respectively')

  const arrayAsJSON = {}

  for(let item of array)
    arrayAsJSON[item[key]] = item;

  return arrayAsJSON
}
