import React from 'react';
import './index.scss';

const UserGuide = () => (
  <div className="welcome">
    <h3>用户指南</h3>
    <ul>
      <li>
        <h5>项目模版</h5>
        <div>
          获取模版列表---
          {'>'}
          选择模版---
          {'>'}
          创建项目
        </div>
        <div>默认初始化git.</div>
      </li>
      <li>
        <h5>项目管理</h5>
        <div>先将IDE添加到环境变量，然后就能使用编辑器打开项目了</div>
        <div>创建项目，导入项目和删除项目</div>
      </li>
      <li>
        <h5>Eslint规则</h5>
        <div>Eslint规则查询，配置，以及复制.eslintrc</div>
      </li>
      <li>
        <h5>任务管理</h5>
        <div>创建任务，完成任务，删除任务</div>
      </li>
      <li>
        <h5>组件模版</h5>
        <div>应用组件，预览组件</div>
      </li>
    </ul>
  </div>
);

export default UserGuide;
