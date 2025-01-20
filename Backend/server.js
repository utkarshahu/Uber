import http from 'http';
import app from './app.js';  // Import app with ES6 syntax

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is successfully running at ${port}`);
});
