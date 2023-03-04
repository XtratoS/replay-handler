require('dotenv').config({ path: __dirname+'/Secret.env' });
import { EventEmitter } from 'events';
import { findOrCreateGroup } from './GroupHandler';
import { getLastNReplaysAfter, getLatestReplay, setReplayGroup } from './ReplayHandler';
import { Actions, Replay } from './types';
import { logEvent, sleep, splitReplayTitle } from './util';
import { matchGroups } from './config.json';
import express from 'express';
import { readFileSync } from 'fs';
const app = express();
let BCPORT = process.env.BALLCHASING_PORT || 3003;
app.get('/', (req, res) => {
  let file = readFileSync('../index.html');
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.send(file);
});
app.get('/log', (req, res) => {
  let file = readFileSync('./console.log');
  res.send(file);
});
app.listen(BCPORT, () => {
  console.log(`BALLCHASING logger is now listening on port ${BCPORT}`);
});

const NEW_REPLAY_EVENT = 'NEW_REPLAY_EVENT';
const emitter = new EventEmitter();

const handleNewReplay = async (replay: Replay) => {
  let replayData;
  try {
    replayData = splitReplayTitle(replay);
  } catch (error) {
    console.error(error);
  }
  if (!replayData) return;

  const { region, seriesLetter, team1abbr, team2abbr, gameIndex } = replayData;

  if (region.toLowerCase() !== 'mena') {
    // logEvent({
    //   title: replay.replay_title,
    //   date: new Date(),
    //   action: Actions.IGNORED_OTHER_REGION
    // });
    console.error(Actions.IGNORED_OTHER_REGION);
    return;
  };

  const groupName = `${team1abbr.toUpperCase()} vs ${team2abbr.toUpperCase()}`;

  const eventBaseArgs = {
    replayLink: replay.link,
    title: replay.replay_title,
    date: new Date(),
    seriesLetter,
    gameIndex,
    groupName,
    team1: team1abbr,
    team2: team2abbr
  };

  if (gameIndex === '0') {
    logEvent({
      ...eventBaseArgs,
      action: Actions.IGNORED_GAME_0,
      actionText: `Ignored Replay 0 of match ${seriesLetter}: ${team1abbr} vs ${team2abbr}`
    });
    console.error(Actions.IGNORED_GAME_0);
    return;
  }

  const parentGroupId = matchGroups.find((groupEntry) => groupEntry.matches.includes(seriesLetter))?.groupId;
  if (!parentGroupId) {
    console.error(`Couldn't find parent group for match ${seriesLetter}\nreply: ${replay.replay_title}\n group: ${groupName}`);
    return;
  };

  let groupResponse: {
    new: boolean,
    groupId: string
  };

  try {
    groupResponse = await findOrCreateGroup(parentGroupId, groupName);
  } catch (error) {
    throw error;
  }
  if (!groupResponse) return;

  logEvent({
    ...eventBaseArgs,
    groupLink: `https://ballchasing.com/group/${groupResponse.groupId}`,
    action: Actions.ADDING_NEW_REPLAY,
    actionText: `${Actions.ADDING_NEW_REPLAY}; ${replay.replay_title}; ${groupName}`
  });

  let res;
  try {
    res = await setReplayGroup(replay.id, groupResponse.groupId);
  } catch (error) {
    throw error;
  }
  if (!res) return;
  return res;
}

emitter.on(NEW_REPLAY_EVENT, handleNewReplay);

const pollAndAssign = async (latestReplay: Replay) => {
	await sleep(10000);
	const newlyUploaded = await getLastNReplaysAfter(20, new Date(+new Date(latestReplay.created)+1000).toISOString());
  if (!newlyUploaded) return;
	if (newlyUploaded.length > 0) {
		latestReplay = newlyUploaded[0];
	}
	newlyUploaded.forEach(replay => {
		emitter.emit(NEW_REPLAY_EVENT, replay);
	});
	pollAndAssign(latestReplay);
}

(async () => {
	let latestReplay = await getLatestReplay();
	if (!latestReplay) return;
	pollAndAssign(latestReplay);
})();
