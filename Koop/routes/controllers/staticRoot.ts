/*
 * GET static website container.
 */
import express = require('express');
import path = require('path');

function staticRoot(req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
};

export = staticRoot;
