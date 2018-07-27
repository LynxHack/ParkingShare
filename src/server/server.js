import express from 'express';
import React from "react";
import { renderToString } from "react-dom/server";
import serialize from "serialize-javascript";
import App from "../client/app";

const port = 3000;
const server = express();
server.use(express.static("public"));

// Creating a single index route to server our React application from.
server.get("/", (req, res) => {
  const name = 'Lynx';
  const markup = renderToString(<App data={name}/>);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Spot Share</title>
        <link rel="stylesheet" type="text/css" href="app.css">
        <script src="/bundle.js" defer></script>
        <script>window.__INITIAL_DATA__ = ${serialize(name)}</script>
      </head>

      <body>
        <div id="app">${markup}</div>
      </body>
    </html>
  `);
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
