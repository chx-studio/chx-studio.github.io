var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

// 端口名
var port = 80;

http.createServer(function (req, res) {
    var pathName = decodeURI(__dirname + url.parse(req.url).pathname);

    if (path.extname(pathName) === "") {
        if (pathName.charAt(pathName.length - 1) === "/") {
            pathName += "index.html";
        } else {
            res.writeHead(302, { 'Location': req.url + "/"});
            res.end();
            return;
        }
    }

    var contentTypes = {
        '.html': 'text/html',
        '.xml': 'text/xml',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.gif': 'image/gif',
        '.jpg': 'image/jpeg',
        '.png': 'image/png'
    }

    fs.exists(pathName, function (exists) {
        if (exists) {
            var extName = path.extname(pathName);
            var contentType = contentTypes[extName] || 'application/octet-stream';
            res.writeHead(200, { "Content-Type": contentType });
            fs.readFile(pathName, function (err, data) {
                res.end(data);
            });
        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Not Found</h1>");
        }
    });
}).listen(port);

console.log("NodeJs Server running at http://localhost:" + port + "/");