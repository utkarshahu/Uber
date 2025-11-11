const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
const chalk = require("chalk");
const { initializeSocket } = require("./socket");

const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

server.listen(port, () => {
    console.log(chalk.hex("#1E90FF").italic("Server is Running..."));
    console.log(chalk.hex("#00CED1").italic(`URL: http://localhost:${port}`));
    console.log(chalk.greenBright("✓ Socket.IO initialized"));
});