


const http = require('http')
const {text} = require('stream/consumers') 
// const url = require('url')

const hostname = '127.0.0.1'
const port = 3001

const server = http.createServer((req,res) => {
    // console.log(url.parse(req.url,true));
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    // const pathName = req.url
    const pathName = req.url
    console.log(`URL = ${pathName}`)

    if (pathName === '/' || pathName === '/home' ) {
        res.end("Home Page")
    }else if(pathName === '/register'){
        res.end("Register Page")
    }else if( pathName === '/login'){
        res.end("Login Page")
        // let username = query.username
        // let password = query.password
        // res.end(`Login Page --> username: ${username} password: ${password}`)
    }else{
        res.writeHead(404)
        res.end("Not Found Page")
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
