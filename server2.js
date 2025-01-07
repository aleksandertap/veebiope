import {createServer} from "http";
const PORT = process.env.PORT;

const users = [
    {id: 1, name: "John Doe"},
    {id: 2, name: "Jane Doe"},
    {id: 3, name: "Jim Doe"},
    {id: 4, name: "Jimmy Doe"}
]

//logger middleware
const logger = (req,res,next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}
//JSON middleware
const jsonMiddleware = (req,res,next)=>{
    res.setHeader("Content-Type", "application/json")
    next()
}
//Route handler for GET /api/users
const getUserHandler = (req,res) => {
    res.write(JSON.stringify(users))
    res.end()
}
//Route handler for GET /api/users/:id
const getuserByIdHandler =(req,res) => {
    const id = req.url.split("/")[3]
    const user = users.find((user)=>user.id === parseInt(id))
    if (user){
        res.write(JSON.stringify(user))
    }
    else {
        res.statusCode = 404
        res.write(JSON.stringify({message: "User not found"}))
    }
    res.end()
}
//Route hanlder for POST /api/users
const createUserHandler = (req,res) => {
    let body = ""
    //listen for Data
    req.on("data", (chunk) =>{
        body += chunk.toString()
    })
    req.on("end", () => {
        const newUser = JSON.parse(body)
        users.push(newUser)
        res.statusCode=201;
        res.write(JSON.stringify(newUser))
        res.end
    } )
}

//Not found handler
const notFoundHandler = (req,res) => {
    res.statusCode = 404
    res.write(JSON.stringify({message: "Route not found"}))
    res.end()
}

const server = createServer((req,res)=>{
    logger(req, res, ()=>{
        jsonMiddleware(req,res, () =>{
            if (req.url === "/api/users" && req.method === "GET"){
                getUserHandler(req,res)
            }
            else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET"){
                getuserByIdHandler(req,res)
            }
            else if(req.url === "/api/users" && req.method === "POST"){
                createUserHandler(req,res)
            }
            else{
                notFoundHandler(req,res)
            }
        })

        //sama üleval lühemalt

        // if (req.url === "/api/users" && req.method === "GET") {
        //     res.setHeader("Content-Type", "application/json")
        //     res.write(JSON.stringify(users))
        //     res.end()
        // }
        // else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET"){
        //     const id = req.url.split("/")[3]
        //     const user = users.find((user)=>user.id === parseInt(id))
        //     res.setHeader("Content-Type", "application/json")
        //     if (user){
        //         res.write(JSON.stringify(user))
        //     }
        //     else {
        //         res.statusCode = 404
        //         res.write(JSON.stringify({message: "User not found"}))
        //     }
        //     res.end()
    
        // }
        // else {
        //     res.setHeader("Content-Type", "application/json")
        //     res.statusCode = 404
        //     res.write(JSON.stringify({message: "Route not found"}))
        //     res.end()
        // }
    })
    
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});