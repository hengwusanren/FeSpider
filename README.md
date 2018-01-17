# FeSpider

[中文文档](https://github.com/shenfe/FeSpider/blob/master/README-zh_CN.md)

Pull a whole element with css styles from the front page.

## Usage

FeSpider provides a chrome devtool extension, namely a `.crx` file, and a server-side (Nodejs) script. With the extension installed, a side panel named "FeSpider" in the "Elements" panel is ready.

Just inspect the element to be pulled out, select some options, and run it.

![inspect](https://raw.githubusercontent.com/shenfe/FeSpider/master/readme_assets/1.png)

![pull](https://raw.githubusercontent.com/shenfe/FeSpider/master/readme_assets/2.png)

![review](https://raw.githubusercontent.com/shenfe/FeSpider/master/readme_assets/3.png)

That's it.

## Advance

If you want to save the extracted content to a local file, or analyze css file contents to extract information such as `@font-face`, you shall start a server. Please select the `fetchFont` option, then start the server locally to listen to file url fetching requests from FeSpider's Chrome Devtool extension.

Just run this command in the `src` directory:

```bash
node ./server.js
```

or this command in the project root directory:

```bash
npm start
```

### HTTPS

Before starting the server, you may need to configure the SSL cert for the server to serve HTTPS resources. Just run this command in the `src` directory:

```bash
sh ./sslcert.sh
```

## Benefit

Css styles would be optimized. Every tag has just one class name. Tags having the same styles would be the same class.

You say "the class names make no sense"? Well, nobody cares elements' class names inside a UI component, even you as a developer.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present, [shenfe](https://github.com/shenfe)
