const { version } = require('./scripts/constants')
const { program } = require('commander')
const path = require('path')
module.exports = function () {
  const mapAction = {
    create: {
      alias: 'create',
      description: 'create a project',
      examples: ['sliver-cli <project-name>']
    },
    'gen-react-component': {
      alias: 'grc',
      description: 'generate a react component',
      examples: ['sliver-cli gen-react-component <component-name>']
    },
    '*': {
      alias: '',
      description: 'command not found',
      examples: []
    }
  }

  Object.keys(mapAction).forEach((action) => {
    program
      .command(action)
      .description(mapAction[action].description)
      .action((source, destination) => {
        if (action === '*') {
          console.log(mapAction[action].description)
        } else {
          require(path.resolve(__dirname, `./scripts/${action}`))(
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

  program.version(version, '-v, --version').parse(process.argv)
}
