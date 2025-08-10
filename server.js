// ✅ CommonJS Syntax (Default Node.js style)
const http = require("http");
const { url } = require("inspector");

const server = http.createServer((req, res) => {
    if(req.url == "/about"){
        console.log(req.url)
        res.end("About Page is here.")
    }else{
        console.log(req.url)
    res.end("Hello Dosto");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
