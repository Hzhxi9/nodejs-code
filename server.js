const http = require('http');
const path = require('path');
const readStaticFiles = require('./readStaticFiles');

const app = http.createServer(async (req, res) => {
    const urlString = req.url;
    const filePathname = path.join(__dirname, './public', urlString);
    const {data, mimeType} = await readStaticFiles(filePathname)

    res.writeHead(200, {
        'content-type': `${mimeType};charset=utf-8`
    })
    res.write(data);
    res.end()
})

app.listen(8080, () => {
    console.log('server is running')
})