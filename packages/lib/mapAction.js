module.exports = {
  create: {
    alias: 'create',
    description: 'create a project with template',
    examples: ['sliver-cli <project-name>']
  },
  'gen-react-component': {
    alias: 'grc',
    description: 'generate a react component',
    examples: ['sliver-cli gen-react-component <component-name>']
  },
  init: {
    alias: 'init',
    description: 'init a normal project',
    examples: ['sliver-cli init <project-name>']
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
}
