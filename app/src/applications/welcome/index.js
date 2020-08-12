import React from 'react';
import './index.scss';

const Welcome = () => (
  <div className="welcome">
    <h3>使用指南</h3>
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
      </li>
    </ul>
  </div>
);

export default Welcome;
