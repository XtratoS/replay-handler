import { makeAPIRequest } from "./API";
import { Replay } from "./types";

export const setReplayGroup = async (replayId: string, groupId: string) => {
  try {
    const res = await makeAPIRequest(`replays/${replayId}`, 'PATCH', {
      group: groupId
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export const getLastNReplaysAfter = async (n = 20, after: string): Promise<Replay[]> => {
  let res;
  try {
    res = await makeAPIRequest(`replays?uploader=me&count=${n}&created-after=${after}`, 'GET', null);
  } catch (error) {
    throw error;
  }
	if (!res) {
		return [];
	}
	const json = await res.json();
	return json.list;
}

export const getLatestReplay = async (): Promise<Replay|undefined> => {
  let res;
  try {
    res = await makeAPIRequest(`replays?uploader=me&count=1&sort-dir=desc&sory-by=upload-date`);
  } catch (error) {
    throw error;
  }
	if (!res) {
		return undefined;
	}
	const json = await res.json();
	return json.list[0];
}
