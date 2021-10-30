# 项目说明

## 如何启动？

- 安装依赖
```
npm i
```

- 开发环境启动

```
npm run dev
```

- 生产环境打包

```
npm run build
```

## 项目规范

1. 禁止在master分支直接开发，项目开发从dev分支新建feature分支进行开发。

2. 分支命名规则为 `feature`＋版本号(版本号为大版本+周数+小版本+姓名，周数从一年的第一个全周算起。)

    例如： `feature/v1.43.0_zxl`

3. git commit 类型:

    - feat：新功能（feature）

    - fix：修补bug

    - docs：文档（documentation）

    - style： 格式化代码（不影响代码运行的变动）

    - refactor：重构（即不是新增功能，也不是修改bug的代码变动）

    - test：增加测试

    - chore：构建过程或辅助工具的变动（修改了依赖）

## 开发工具

- 使用 VScode

    推荐插件：

    - Git Graph

    - GitLens

    - Tabnine




