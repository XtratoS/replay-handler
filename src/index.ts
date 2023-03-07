require('dotenv').config({ path: __dirname+'/Secret.env' });
import { EventEmitter } from 'events';
import { findOrCreateGroup } from './GroupHandler';
import { getLastNReplaysAfter, getLatestReplay, setReplayGroup } from './ReplayHandler';
import { Actions, ConfigFile, GroupResponse, Replay } from './types';
import { logEvent, sleep, splitReplayTitle } from './util';
import express from 'express';
import { readFileSync } from 'fs';

const rawConfigFile = readFileSync('./config.json', 'utf-8');
const parsedConfig: ConfigFile = JSON.parse(rawConfigFile);
const matchGroups = parsedConfig.matchGroups;

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
    console.error(Actions.IGNORED_OTHER_REGION);
    return;
  };

  const groupName = `${team1abbr.toUpperCase()} vs ${team2abbr.toUpperCase()}`;

  const eventBaseArgs = {
    replayLink: `https://ballchasing.com/replay/${replay.link.split('/').pop()}`,
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

  let groupResponse: GroupResponse;
  try {
    groupResponse = await findOrCreateGroup(parentGroupId, groupName);
  } catch (error) {
    console.error(error);
    return;
  }
  if (!groupResponse) return;

  logEvent({
    ...eventBaseArgs,
    groupLink: `https://ballchasing.com/group/${groupResponse.groupId}`,
    action: Actions.ADDING_NEW_REPLAY,
    actionText: `${Actions.ADDING_NEW_REPLAY}; ${replay.replay_title}; ${groupName}`
  });

  let assignReplayToGroupResponse;
  try {
    assignReplayToGroupResponse = await setReplayGroup(replay.id, groupResponse.groupId);
  } catch (error) {
    console.error(error);
    return;
  }
  if (!assignReplayToGroupResponse) return;
  return assignReplayToGroupResponse;
}

emitter.on(NEW_REPLAY_EVENT, handleNewReplay);

const pollForNewReplays = async (latestReplay: Replay) => {
  const latestReplayTimestamp = +new Date(latestReplay.created);
  const latestReplayDateString = new Date(latestReplayTimestamp).toISOString()
	const newlyUploadedReplays = await getLastNReplaysAfter(20, latestReplayDateString);
  if (!newlyUploadedReplays) return;
	if (newlyUploadedReplays.length > 0) {
		latestReplay = newlyUploadedReplays[0];
	}
	newlyUploadedReplays.forEach(replay => {
		emitter.emit(NEW_REPLAY_EVENT, replay);
	});
  await sleep(10000);
	pollForNewReplays(latestReplay);
}

const main = async () => {
  let latestReplay = await getLatestReplay();
	if (!latestReplay) return;
	pollForNewReplays(latestReplay);
}

main();