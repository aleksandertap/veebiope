// import fs from "fs";

//readFile() - callback

// fs.readFile('./test.txt', 'utf8', (err,data)=>{
//     if(err) throw err;
//     console.log(data)
// })

//readFileSync(). Synchronous version

// const data = fs.readFileSync('./test.txt', 'utf8')
// console.log(data)

import fs from "fs/promises";

//readFile() - Promise .then()
// fs.readFile("./test.txt", "utf8")
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err))

const readFile = async () => {
    try {
        const data = await fs.readFile('./test.txt', 'utf8')
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

//writeFile()
const writeFile = async () => {
    try {
        await fs.writeFile('./test.txt', 'Hello im writing to this file again for second time.')
        console.log('File written to...')
    } catch (error) {
        console.log(error)
    }
}
//appendFile()
const appendFile = async () => {
    try {
        await fs.appendFile('./test.txt', '\nThis is appended text')
        console.log('File appended to...')
    } catch (error) {
        console.log(error)
    }
}

writeFile()
appendFile()
readFile()