import * as url from 'url'
import * as http from "http"
import * as path from 'path'
import * as fs from 'fs'

const workdir = path.resolve() + '/files'

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);

    const filePath = path.join(workdir, parsedUrl.pathname);

    if (filePath.indexOf(workdir) !== 0) {
        res.writeHead(403);
        res.end();
        return; //?
    }

    fs.stat(filePath, (err, stat) => {

        if (err) {
            res.writeHead(404);
            res.end();
            return;
        }

        const filename = parsedUrl.query.filename || parsedUrl.pathname.slice(1);

        
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Length': stat.size,
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Set-Cookie': `Referer=${req.headers.referer}`
        });

        const fileStream = fs.createReadStream(filePath);

        fileStream.pipe(res);

    })


})


server.listen(8080)