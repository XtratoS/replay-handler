import { makeAPIRequest } from "./API";
import { ReplayGroup } from "./types";
import { sleep } from "./util";

const getGroupList = async (endpoint: string, method = 'GET', body: {} | null): Promise<ReplayGroup[]> => {
	const res = await makeAPIRequest(endpoint, method, body);
	if (!res) {
		return [];
	}
	const jsonRes = await res.json();
	return jsonRes.list || [];
}

export const getGroups = async (groupId: string, groupName = ''): Promise<{groupId: string, groupName: string}[]> => {
	await sleep(100);
	const childGroups = await getGroupList(`groups?creator=me&group=${groupId}`, 'GET', null);
	if (childGroups.length === 0) {
		return [{groupId, groupName}];
	}
	let output: {groupId: string, groupName: string}[] = [];
	for (let i=0; i<childGroups.length; i++) {
		const group = childGroups[i];
		const childGroupsOfChild = await getGroups(group.id, group.name);
		output = [
			...output,
			...childGroupsOfChild
		];
	}
	return output;
}