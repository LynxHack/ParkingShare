const express = require('express');

const port = 3000;
const server = express();

server.use(express.static("public"));

// Creating a single index route to server our React application from.
server.get("/", (req, res) => {
  res.render("../../public/index.html");
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
