优先级比编辑器自身的设置要高;
This plugin attempts to override user/workspace settings with settings found in .editorconfig files. No additional or vscode-specific files are required. As with any EditorConfig plugin, if root=true is not specified, EditorConfig will continue to look for an .editorconfig file outside of the project.

This repository is specific to the EditorConfig Extension for Visual Studio Code. Internally, it uses the editorconfig npm package, which is one of a few EditorConfig cores available.

How it works
This extension is activated whenever you open a new text editor, switch tabs into an existing one or focus into the editor you already have open. When activated, it uses editorconfig to resolve the configuration for that particular file and applies any relevant editor settings.

Note: some settings can only be applied on file save, as indicated above.


indent_size 功能类似于 tab_size；
editorconfig 是编辑器的配置，eslint 是代码规则，两者不冲突；