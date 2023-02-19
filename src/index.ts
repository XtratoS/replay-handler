require('dotenv').config({ path: __dirname+'/Secret.env' });
import { EventEmitter } from 'events';
import { findOrCreateGroup } from './GroupHandler';
import { getLastNReplaysAfter, getLatestReplay, setReplayGroup } from './ReplayHandler';
import { Replay } from './types';
import { logEvent, sleep, splitReplayTitle } from './util';
const parentGroups: {groupId: string, letters: string[]}[] = require('./MatchesParentGroups.json');

const NEW_REPLAY_EVENT = 'new_replay';
const emitter = new EventEmitter();

const handleNewReplay = async (replay: Replay) => {
	const replayData = splitReplayTitle(replay);

  if (!replayData) return;
  if (replayData.region.toLowerCase() !== 'mena') return;

  const groupName = replayData.team1abbr.toUpperCase() + ' vs ' + replayData.team2abbr.toUpperCase();

  if (replayData.gameIndex === '0') {
    logEvent({
      date: new Date(),
      action: 'Ignored replay',
      seriesLetter: replayData.seriesLetter,
      gameIndex: replayData.gameIndex,
      groupName,
      team1: replayData.team1abbr,
      team2: replayData.team2abbr,
      actionText: `Ignored Replay 0 of match ${replayData.seriesLetter}: ${replayData.team1abbr} vs ${replayData.team2abbr}`
    })
    return;
  }

  const parentGroupId = parentGroups.find((groupEntry) => groupEntry.letters.includes(replayData.seriesLetter))?.groupId;
  if (!parentGroupId) return;

  const groupId = await findOrCreateGroup(parentGroupId, groupName);
  if (groupId === '') return;

  logEvent({
    date: new Date(),
    action: 'Adding new replay',
    seriesLetter: replayData.seriesLetter,
    gameIndex: replayData.gameIndex,
    groupName,
    team1: replayData.team1abbr,
    team2: replayData.team2abbr,
    actionText: 'Adding new replay; ' + replay.replay_title + '; ' + groupName
  });
  // logEvent(`${new Date().toUTCString()}; Adding new replay; Game ${replayData.gameIndex} of ${replayData.team1abbr} vs ${replayData.team2abbr}; ${replay.replay_title}; ${groupName}`);
  // logEvent('Adding new replay; ' + replay.replay_title + '; ' + groupName + '');
  const res = await setReplayGroup(replay.id, groupId);
}

emitter.on(NEW_REPLAY_EVENT, handleNewReplay);

const pollAndAssign = async (latestReplay: Replay) => {
	await sleep(5000);
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