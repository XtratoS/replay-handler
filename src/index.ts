require('dotenv').config({ path: __dirname+'/Secret.env' });
import { EventEmitter } from 'events';
import { findOrCreateGroup } from './GroupHandler';
import { getLastNReplaysAfter, getLatestReplay, setReplayGroup } from './ReplayHandler';
import { Actions, ConfigFile, GroupResponse, Replay } from './types';
import { logEvent, sleep, splitReplayTitle } from './util';
import { readFileSync } from 'fs';
import startApp from './ExpressApp';

let cacheHandler = startApp();

const rawConfigFile = readFileSync('./config.json', 'utf-8');
const parsedConfig: ConfigFile = JSON.parse(rawConfigFile);
const matchGroups = parsedConfig.matchGroups;

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

  cacheHandler.updateCache();

  const { region, seriesLetter, team1abbr, team2abbr, gameIndex } = replayData;

  const groupName = `${team1abbr.toUpperCase()} vs ${team2abbr.toUpperCase()}`;

  const eventBaseArgs = {
    replayLink: `https://ballchasing.com/replay/${replay.link.split('/').pop()}`,
    title: replay.replay_title,
    date: new Date(),
    seriesLetter,
    gameIndex,
    groupName: 'Unknown',
    team1: team1abbr,
    team2: team2abbr
  };

  const regions = process.env.CONSIDERED_REGIONS ? process.env.CONSIDERED_REGIONS.split(',') : ['MENA'];
  const regionsLowerCase = regions.map(r => r.toLowerCase());
  if (!regionsLowerCase.includes(region.toLowerCase())) {
    logEvent({
      ...eventBaseArgs,
      action: Actions.IGNORED_OTHER_REGION,
      actionText: `Ignored replay *${replay.replay_title}* from ${region} region`
    });
    console.error(Actions.IGNORED_OTHER_REGION);
    return;
  };

  eventBaseArgs.groupName = groupName;

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

  let assignReplayToGroupResponse;
  try {
    assignReplayToGroupResponse = await setReplayGroup(replay.id, groupResponse.groupId);
    logEvent({
      ...eventBaseArgs,
      groupLink: `https://ballchasing.com/group/${groupResponse.groupId}`,
      action: Actions.ADDING_NEW_REPLAY,
      actionText: `${Actions.ADDING_NEW_REPLAY}; ${replay.replay_title}; ${groupName}`
    });
    console.log(`assigned replay *${replay.replay_title}* to group *${groupResponse.groupId}* in parent group *${parentGroupId}*`);
  } catch (error) {
    console.error(`Failed to assign replay *${replay.replay_title}* to group *${groupResponse.groupId}*`, error);
    return;
  }
  if (!assignReplayToGroupResponse) return;
  return assignReplayToGroupResponse;
}

emitter.on(NEW_REPLAY_EVENT, handleNewReplay);

const pollForNewReplays = async (latestReplay: Replay) => {
  const latestReplayTimestamp = +new Date(latestReplay.created) + 1;
  const latestReplayDateString = new Date(latestReplayTimestamp).toISOString();
  let newlyUploadedReplays = [];
  try {
    newlyUploadedReplays = await getLastNReplaysAfter(20, latestReplayDateString);
  } catch (error) {
    console.error(error);
    return latestReplay;
  }
  if (newlyUploadedReplays.length === 0) return latestReplay;
  latestReplay = newlyUploadedReplays[0];
	newlyUploadedReplays.forEach(replay => {
		emitter.emit(NEW_REPLAY_EVENT, replay);
	});
  return latestReplay;
}

const main = async () => {
  let counter = 0;
  let latestReplay = await getLatestReplay();
  while(true) {
    console.log(`${++counter}: ${counter%2==0?'Pong!':'Ping!'}`);
    if (!latestReplay) {
      await sleep(10000);
      continue;
    }
    latestReplay = await pollForNewReplays(latestReplay);
    await sleep(10000);
  }
}

main();