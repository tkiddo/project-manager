module.exports = {
  create: {
    alias: 'c',
    description: 'create a project with template',
    examples: ['sliver-cli <project-name>']
  },
  'gen-react-component': {
    alias: 'grc',
    description: 'generate a react component',
    examples: ['sliver-cli gen-react-component <component-name>']
  },
  'gen-redux-store': {
    alias: 'grs',
    description: 'generate a redux store module',
    examples: ['sliver-cli gen-redux-store <module-name>']
  },
  'git-push': {
    alias: 'gpush',
    description: 'commit and push',
    examples: ['sliver-cli git-push']
  },
  lint: {
    alias: 'l',
    description: 'start lint code',
    examples: ['sliver-cli lint']
  },
  init: {
    alias: 'i',
    description: 'init a normal project',
    examples: ['sliver-cli init <project-name>']
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
}
