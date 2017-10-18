/**
 * @Author: Ke Shen <godzilla>
 * @Date:   2017-03-10 09:43:57
 * @Email:  keshen@sohu-inc.com
 * @Last modified by:   godzilla
 * @Last modified time: 2017-03-10 09:43:57
 */

const fs = require('fs');

const conf = {
    pullDir: 'resources' // the dir name
};

const express = require('express');
const app = express();

const https = require('https');
const privateKey  = fs.readFileSync('sslcert/private.pem', 'utf8');
const certificate = fs.readFileSync('sslcert/file.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3663, function () {
    console.log('Listening on port %d', httpsServer.address().port);
});

const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const superagent = require('superagent');

const cssBeautify = require('js-beautify').css;
const htmlBeautify = require('js-beautify').html;

// CORS middleware
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

    next();
};

app.use(allowCrossDomain);

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/resources'));

app.get('/get/:url', function (req, res) {
    let url = decodeURIComponent(req.params.url);
    console.log('get: ' + url);
    superagent.get(url)
        .then(function (pres, err) {
            res.send(pres.text);
        });
});

const trans = function (data) {
    let re = '';
    switch (data.type) {
    case 'html':
        let template = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${data.name}</title><style>${data.style}</style></head><body style="margin:0">${data.html}</body></html>`;
        re = htmlBeautify(template);
        break;
    case 'vue':
        let html = htmlBeautify(data.html);
        let style = cssBeautify(data.style);
        re = `<template>\n${html}\n</template>\n\n<style scoped>\n${style}\n</style>`;
        break;
    }
    return re;
};

const pathExists = function (path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
};

const mkDir = function (path) {
    if (!pathExists(path)) fs.mkdirSync(path, 0777);
};
mkDir(conf.pullDir);

const getNewFilePath = function (path, format) {
    let count = '';
    while (pathExists(path + count + '.' + format)) {
        count = count ? (count + 1) : 1;
    }
    return path + count + '.' + format;
};

app.post('/post', multipartMiddleware, function (req, res) {
    let data = JSON.parse(req.body.json);
    console.log('/post: ' + data.name + '.' + data.type);
    fs.writeFile(getNewFilePath(conf.pullDir + '/' + data.name, data.type), trans(data), function (err) {
        if (err) throw err;
    });
    res.json({
        code: 200,
        msg: 'success'
    });
});
