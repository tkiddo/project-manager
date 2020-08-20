const menu = [
  {
    name: '用户指南',
    path: '/userguide'
  },
  {
    name: '项目管理',
    path: '/projectmanage'
  },
  {
    name: '项目模版',
    path: '/tplmanage'
  },
  {
    name: 'Eslint规则',
    path: '/eslintmanage'
  },
  {
    name: '任务管理',
    path: '/taskmanage'
  },
  {
    name: '组件模版',
    path: '/comptemplate'
  }
];

const api = {
  baseUrl: ''
};

const componentTemplateApi = {
  react: {
    previewUrl: 'https://sliver-cli.github.io/react-component/#/'
  }
};

export { menu, api, componentTemplateApi };
