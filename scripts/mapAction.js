module.exports = {
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
  // build: {
  //   alias: 'build',
  //   description: 'build a bundle',
  //   examples: ['sliver-cli build']
  // },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
}
