require('dotenv').config({ path: __dirname+'/Secret.env' });
import { EventEmitter } from 'events';
import { getGroups } from './GroupHandler';
import { getLastNReplaysAfter, getLatestReplay } from './ReplayHandler';
import { Replay } from './types';
import { sleep, splitReplayTitle } from './util';

const NEW_REPLAY_EVENT = 'new_replay';

const emitter = new EventEmitter();

const getExistingGroups = async () => {
	const parentGroupId = process.env.BALLCHASING_CURRENT_PARENT_GROUP_ID;
	if (!parentGroupId) return;
	const childGroups = await getGroups(parentGroupId);
	return childGroups;
}

const handleNewReplay = async (replay: Replay) => {
	const replayData = splitReplayTitle(replay);
	const replayGroupsPromise = getExistingGroups();
}

emitter.on(NEW_REPLAY_EVENT, handleNewReplay);

const pollAndAssign = async (latestReplay: Replay) => {
	await sleep(5000);
	console.log('Polling for new replays!', latestReplay.created);
	const newlyUploaded = await getLastNReplaysAfter(20, new Date(+new Date(latestReplay.created)+1000).toISOString());
	if (newlyUploaded.length > 0) {
		latestReplay = newlyUploaded[0];
	}
	console.log(newlyUploaded);
	newlyUploaded.forEach(replay => {
		console.log(latestReplay.created, replay.created);
		console.log('new replay!');
		emitter.emit(NEW_REPLAY_EVENT, replay);
	});
	pollAndAssign(latestReplay);
}

(async () => {
	let latestReplay = await getLatestReplay();
	if (!latestReplay) return;
	pollAndAssign(latestReplay);
})();