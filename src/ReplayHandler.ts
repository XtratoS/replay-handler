import { makeAPIRequest } from "./API";
import { Replay } from "./types";

export const getLastNReplays = async (n = 20): Promise<Replay[]> => {
	const res = await makeAPIRequest(`replays?uploader=me&count=${n}`, 'GET', null);
	if (!res) {
		return [];
	}
	const json = await res.json();
	return json.list;
}

export const getLastNReplaysAfter = async (n = 20, after: string): Promise<Replay[]> => {
	const res = await makeAPIRequest(`replays?uploader=me&count=${n}&created-after=${after}`, 'GET', null);
	if (!res) {
		return [];
	}
	const json = await res.json();
	return json.list;
}

export const getLatestReplay = async (): Promise<Replay|undefined> => {
	const res = await makeAPIRequest(`replays?uploader=me&count=1`, 'GET', null);
	if (!res) {
		return undefined;
	}
	const json = await res.json();
	return json.list[0];
}

export const extractNewlyUploadedFromPolled = (latestReplay: Replay, polledReplays: Replay[] = []) => {
	const latestReplayDate = latestReplay.date;
	const latestReplayTimestamp = +new Date(latestReplayDate);
	const newlyUploadedReplays = polledReplays.filter(replay => +new Date(replay.date) > latestReplayTimestamp);
	return newlyUploadedReplays;
}