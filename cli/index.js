const { version } = require('./packages/lib/constants')
const { program } = require('commander')
const path = require('path')
const mapAction = require('./packages/lib/mapAction')
module.exports = function () {
  program.option('-m,--msg', 'commit message')

  Object.keys(mapAction).forEach((action) => {
    program
      .command(action)
      .alias(mapAction[action].alias)
      .description(mapAction[action].description)
      .action((source, destination) => {
        if (action === '*') {
          console.log(mapAction[action].description)
        } else {
          require(path.resolve(__dirname, `./packages/commander/${action}`))(
            ...process.argv.slice(3)
          )
        }
      })
  })

  program.on('--help', () => {
    console.log('\nExamples:')
    Object.keys(mapAction).forEach((action) => {
      mapAction[action].examples.forEach((example) => {
        console.log(`  ${example}`)
      })
    })
  })

  program.option('-m,--message', 'commit message')
  program.version(version, '-v, --version').parse(process.argv)
}
