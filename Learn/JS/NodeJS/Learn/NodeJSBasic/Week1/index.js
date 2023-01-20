const http = require('http')

const hostname = '127.0.0.1'
const port = 3001

function tel(phone) {
    let word = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    let textnumarr = []
    let result = []
    for (let index = 0; index <= 9; index++) {
        let singletext = phone.slice(index, index + 1);
        singletext = parseInt(singletext)
        textnumarr.push(singletext)
    }
    for (const x of textnumarr) {
        result.push(word[x])
    }

    return result
}

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/html')

    let name = 'Kasidit Boonchai'
    let phone = '0846995862'

    for (let index = 0; index <= 9; index++) {
        if (index % 2 == 0) {
            res.write(`<h2>[${index}]Name: ${name} \n </h2>`)
        } else {
            res.write(`<h6>[${index}]Name: ${name} \n </h6>`)
        }
    }


    telarr = tel(phone)

    res.write(`<h2>phone number is ${phone} or ${telarr}</h2>`)
    // console.log(tel(phone));

    res.end()
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})


