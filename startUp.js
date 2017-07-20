'use strict';

const lstart = require("./Koastartup.js");
const wstart = require("./webSocketStart.js");


wstart(lstart.listen(3000));