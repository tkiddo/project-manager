# 从 CLI 到 GUI

## sliver-cli

### 安装

```Shell
yarn add global sliver-cli
```

### 使用

### 创建初始化项目

```Shell
sliver-cli init <project-name>
```

- normal project

1. 内置`webpack`热启动，打包配置已做相应优化，具体看项目内`webpack.dev.js`和`webpack.prod.js`

2. 内置 Eslint 代码检查，采用`eslint-config-airbnb-base`扩展

3. 采用 SASS 作为 CSS 预编译器

- react project

1. 包含 normal project 的所有配置

2. 内置`react`+`redux`+`react-router-dom`

3. `react`和`react-dom`单独打包，运行项目前需要

```Shell
yarn build-react
```

4. Eslint 采用`eslint-config-airbnb`扩展

### 新建 react 组件

```Shell
sliver-cli gen-react-component <component-name>

or

sliver-cli grc <component-name>
```

该操作会在当前目录下寻找`components`目录(如果没有则创建)，并在`components`目录项创建组件，包含`index.js`和`index.scss`

### 新建 react store

```Shell
sliver-cli gen-react-store <store-name>

or

sliver-cli grs <store-name>
```

该操作会在当前目录下寻找`store`目录(如果没有则创建)，并在`store`目录项创建组件，包含`action.js`,`reducer.js`,`constant.js`

### git 提交

```Shell
sliver-cli git-push

or

sliver-cli gpush
```

执行该操作会提示输入`message`,然后依次执行`git pull`,`git add .`,`git commit -m <message>`,`git push origin master`

## GUI

### 直接运行

首先,单独打包 React 以及 React-DOM,以 DLL 的形式引入

```Shell
yarn build-react
```

然后，启动前端单页应用

```Shell
yarn start-renderer
```

最后,修改`main.js`以加载单页应用，并启动 electron 应用

```js
// 加载应用----适用于生产模式
// mainWindow.loadFile('./dist/index.html');

// 加载应用----适用于开发模式
mainWindow.loadURL('http://localhost:3000/');
```

```Shell
yarn electron
```

### 打包运行

首先,单独打包 React 以及 React-DOM,以 DLL 的形式引入

```Shell
yarn build-react
```

然后，打包前端单页应用

```Shell
yarn build-renderer
```

最后,修改`main.js`以加载单页应用，并打包 electron 应用

```js
// 加载应用----适用于生产模式
mainWindow.loadFile('./dist/index.html');

// 加载应用----适用于开发模式
// mainWindow.loadURL('http://localhost:3000/');
```

```Shell
yarn dist
```

生成的 bundle 文件夹即是 exe 文件所在目录
