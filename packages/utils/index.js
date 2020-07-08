const upperCaseTheFirstLetter = (string) =>
  string.substring(0, 1).toUpperCase() + string.substring(1)

const handleAwait = (promise) => {
  return promise
    .then((data) => [data])
    .catch((err) => {
      console.log(err)
      return [null, err]
    })
}
module.exports = {
  upperCaseTheFirstLetter,
  handleAwait
}
