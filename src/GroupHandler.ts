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

export const findOrCreateGroup = async (parentGroupId: string, groupName: string): Promise<string> => {
  const childGroupsRequest = await makeAPIRequest(`groups?group=${parentGroupId}`);
  if (!childGroupsRequest) return '';
  const jsonResponse = await childGroupsRequest.json();
  if (!jsonResponse || !jsonResponse.list) return '';
  const childGroups: ReplayGroup[] = jsonResponse.list;

  let groupId = '';

  let groupIdInChildGroups = childGroups.find(group => group.name.toLowerCase() === groupName.toLowerCase())?.id;
  if (groupIdInChildGroups) {
    groupId = groupIdInChildGroups
  }

  if (!groupIdInChildGroups) {
    let groupRes = await makeAPIRequest('groups', 'POST', {
      name: groupName,
      parent: parentGroupId,
      player_identification: 'by-id',
      team_identification: 'by-distinct-players'
    });
    let jsonRes = await groupRes?.json();
    groupId = jsonRes.id;
  }

  return groupId;
}