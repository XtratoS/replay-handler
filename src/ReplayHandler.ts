import { makeAPIRequest } from "./API";
import { Replay } from "./types";

export const setReplayGroup = async (replayId: string, groupId: string) => {
  const res = await makeAPIRequest(`replays/${replayId}`, 'PATCH', {
    group: groupId
  });
}

export const getLastNReplaysAfter = async (n = 20, after: string): Promise<Replay[]> => {
	const res = await makeAPIRequest(`replays?uploader=me&count=${n}&created-after=${after}&title=mena`, 'GET', null);
	if (!res) {
		return [];
	}
	const json = await res.json();
	return json.list;
}

export const getLatestReplay = async (): Promise<Replay|undefined> => {
	const res = await makeAPIRequest(`replays?uploader=me&count=1&title=mena`, 'GET', null);
	if (!res) {
		return undefined;
	}
	const json = await res.json();
	return json.list[0];
}