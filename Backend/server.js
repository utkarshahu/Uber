const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
const chalk = require("chalk");

const server = http.createServer(app);

server.listen(port, () => {
    // Hex code #1E90FF (DodgerBlue) with italic
    console.log(chalk.hex("#1E90FF").italic("Server is Running..."));

    // Hex code #00CED1 (DarkTurquoise) bold for URL
    console.log(chalk.hex("#00CED1").italic(`URL: http://localhost:${port}`));
});
