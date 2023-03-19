import express from 'express';
import { readFileSync } from 'fs';
import { getJsonLog } from './util';
let jsonLog = getJsonLog();
let logCached = true;

const app = express();
let BCPORT = process.env.BALLCHASING_PORT || 3003;

app.get('/', (req, res) => {
  let file = readFileSync('../index.html');
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.send(file);
});

app.get('/config', (req, res) => {
  let file = readFileSync('../config.html');
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.send(file);
});

app.get('/log', (req, res) => {
  if (!logCached) {
    jsonLog = getJsonLog();
  }
  let responseJson = jsonLog.slice(-50);
  res.json(responseJson);
});

const startApp = () => {
  app.listen(BCPORT, () => {
    console.log(`BALLCHASING logger is now listening on port ${BCPORT}`);
  });
  return {
    updateCache: () => {
      logCached = false;
    }
  }
}

export default startApp;