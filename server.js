const http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
    fs = require('fs'),
    path = require('path');

const index = 'index.html',
    route = path.join(__dirname);

app = http.createServer();


app.on('request', (request, response) => {
    let { pathname, query } = url.parse(request.url),
        method = request.method;

    if (method == 'GET') {
        pathname = pathname == '/' ? '/' + index : pathname;

        console.log(method);
        console.log(pathname);

        fs.readFile(decodeURI(route + pathname), (err, data) => {
            if (err != null) {
                response.writeHead(404, {
                    'content-type': 'text/html;charset=utf-8;'
                });
                response.end('<h1 style="text-align:center;">404 Not Found</h1>');
                return;
            }
            response.end(data)
        });
    } else if (method == 'POST') {

    }


});

app.listen(81);