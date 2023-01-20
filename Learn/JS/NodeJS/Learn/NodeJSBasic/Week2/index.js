// const http = require('http')
// // const {text} = require('stream/consumers') 
// const url = require('url')

// const hostname = '127.0.0.1'
// const port = 3001
// const server = http.createServer((req,res) => {
//     // console.log(url.parse(req.url,true));
//     res.statusCode = 200
//     res.setHeader('Content-Type','text/html')
//     // const pathName = req.url
//     const {pathName,query} = url.parse(req.url,true)
//     console.log(`URL = ${pathName}`)

//     if (pathName === '/' || pathName === '/home' ) {
//         res.end("Home Page")
//     }else if(pathName === '/register'){
//         res.end("Register Page")
//     }else if( pathName === '/login'){
//         // res.end("Login Page")
//         let username = query.username
//         let password = query.password
//         res.end(`Login Page --> username: ${username} password: ${password}`)
//     }else{
//         res.writeHead(404)
//         res.end("Not Found Page")
//     }
// })

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// })


const express = require('express')
const app = express()

const hostname = '127.0.0.1'
const port = 8080

app.use((req, res) => {
    res.status(404).send("Page Not Found")
})

app.get("/", (req, res) => {
    res.send("Hello express.js Homepage")
})

app.get("/home", (req, res) => {
    res.send("Hello express.js Homepage")
})

app.get("/product", (req, res) => {
    res.send("Hello express.js Product Get")
})

app.post("/products", (req, res) => {
    res.send("Hello express.js Product Post")
})

app.get("/1", (req, res) => {
    res.send("Hello express.js Page 1")
})

app.get("/2", (req, res) => {
    res.send("Hello express.js Page 2")
})

app.get("/3", (req, res) => {
    res.send("Hello express.js Page 3")
})

app.get("/4", (req, res) => {
    res.send("Hello express.js Page 4")
})

app.get("/5", (req, res) => {
    res.send("Hello express.js Page 5")
})

app.get("/6", (req, res) => {
    res.send("Hello express.js Page 6")
})



app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

