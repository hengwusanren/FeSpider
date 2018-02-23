# FeSpider

将选中的HTML元素，扒下来，留下整洁的HTML和优化的CSS。

## 使用方法

FeSpider提供一个浏览器扩展和一个本地服务脚本。浏览器扩展，即一个Chrome开发者工具扩展，是`.crx`文件；本地服务脚本，用于本地启动一个Node服务，响应FeSpider扩展从前端发送的请求，将扒取的内容保存为本地文件。

### 浏览器扩展

浏览器扩展安装后，开发者工具的Elements面板的侧面板的最后出现名为FeSpider的面板。

审查元素选中需要被扒取的元素，在FeSpider面板点击`present`按钮，运行完成后页面上只剩下被选中元素，而其HTML/CSS已经经过清洗、合并、优化并呈现在了FeSpider面板中：

![demo](https://raw.githubusercontent.com/shenfe/FeSpider/master/readme_assets/demo.gif)

就这么简单。如果上一步操作没有反应，可能是因为首次安装扩展脚本没有立即植入生效，刷新页面再次尝试即可。

### 启动本地服务

如果想要将抽取的元素内容保存到本地，或者想连`@font-face`信息一并提取，那么需要本地启动服务。服务脚本在src目录下。注意src目录相当于FeSpider服务的workspace。

首先，服务需要响应HTTPS请求。如果不使用项目提供的SSL证书（sslcert文件夹），而想重新配置，则执行以下命令，并遵从提示输入必要信息：

```bash
$ sh ./sslcert.sh
```

然后，可以运行server了。执行以下命令（或者在项目根路径下命令行执行`npm start`）：

```bash
$ node ./server.js
```

此服务默认监听3663端口。FeSpider浏览器扩展从前端发送的请求的url的域就是https://127.0.0.1:3663 。

最后，在FeSpider面板中勾选相应选项。如果需要服务器对CSS文件中的字体信息进行解析，则选中`fetchFont`；如果需要服务器把抽取的内容保存为文件，则选中`pullContent`。

**注意**：初次启动本地服务后，在浏览器端使用FeSpider扩展并勾选了服务相关的选项，浏览器可能会因为HTTPS证书不可信任而拦截扩展发往本地服务的请求，此时只需要在浏览器控制台在被拦截的请求url上右键在新标签页中打开，然后添加信任，重新执行FeSpider的操作，即可。

### 配置选项说明

| 选项 | 作用 |
| :---: | :--- |
classNameUpperCase | 在为HTML元素分配CSS类名时，是否使用大写。默认为否。
classNameModulePrefix | 在为HTML元素分配CSS类名时，是否使用一个模块名作为前缀。默认为是。
moduleName | 为被抽取的元素起一个模块名。默认为`module`。
recoverUrlInAttr | 是否将标签属性中的url修复为绝对路径。默认为否。
serverHost | 本地服务的域。默认为https://127.0.0.1:3663 。
fetchFont | 是否需要服务器对CSS文件中的字体信息进行解析。默认为否。
pullContent | 是否需要服务器把抽取的内容保存为文件。默认为否。默认保存路径为src/resources。
generateType | 如果将内容保存为文件，则以何种形式生成文件内容。支持HTML和Vue组件两种。默认为HTML。

## 优势与局限

FeSpider是神器，一用即懂。

FeSpider的局限性体现在，目前它只能解析静态的“一幕”，也就是说，任何动态的样式暂时是无法获取的。今后可以增强服务脚本的功能，着重对CSS进行分析，如果能把hover状态、动画、media query等也一并获取，是比较理想的。

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright © 2017-present, [shenfe](https://github.com/shenfe)
