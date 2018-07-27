// src/browser/index.js

import React from "react";
import { hydrate } from "react-dom";
import App from "./app.js";

hydrate(<App data={window.__INITIAL_DATA__}/>, document.getElementById("app"));