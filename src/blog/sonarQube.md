## SonarQube
https://www.sonarsource.com/js/ 是一个用于代码质量管理的开源平台，用于管理源代码的质量，是市场上最受欢迎的代码质量和安全性分析工具.可以检测js、ts、html、python等27种语言代码中的重复代码、 潜在bug、 代码规范、安全性漏洞等问题。sonar-gitlab-plugin 可以集成到gitlab ci流程中，需要付费。Sonar本身不进行代码分析，但可集成多种静态分析工具（如CheckStyle,PMD,Findbugs等）对软件的质量进行评估。
sonarQube7.8 支持.vue检测，sonarQube目前最新版本是9.3.0.51899

## Sonar优点
Sonar可以从以下七个维度检测代码质量，而作为开发人员至少需要处理前5种代码质量问题
1. 不遵循代码标准
2. 潜在的缺陷，sonar可以通过PMD,CheckStyle,Findbugs等等代码规则检测工具检测出潜在的缺陷
3. 糟糕的复杂度分布
4. 重复
5. 注释不足或者过多
6. 缺乏单元测试
7. 糟糕的设计


SonarLint vscode插件，https://www.sonarqube.org/sonarlint/，但是需要自己安装 Java Runtime (JRE) 11+环境，比较麻烦。

eslint-plugin-sonarjs： https://github.com/SonarSource/eslint-plugin-sonarjs ，可以检测增量commit的重复func、重复常量等，具体见 github readme 的 rules。
