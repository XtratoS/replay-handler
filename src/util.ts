import { Replay } from "./types";
import { appendFileSync, readFileSync, writeFileSync } from 'fs';

type abbrType = {abbr: string, full: string}
const Abbreviations: abbrType[] = require('./Abbreviations.json') as abbrType[];

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const splitReplayTitle = (replay: Replay): {
	region: string,
	seriesLetter: string,
	team1abbr: string,
	team2abbr: string,
	team1full: string,
	team2full: string,
	gameIndex: string
}|null => {
	const splitReplayTitle = replay.replay_title.split(' ').filter(e => e.length > 0);
  if (splitReplayTitle.length < 6) return null;
	const region = splitReplayTitle[0];
	const seriesLetter = splitReplayTitle[1];
	let team1abbr = splitReplayTitle[2];
	let team2abbr = splitReplayTitle[4];
  let team1abbrIndex = Abbreviations.findIndex((team: abbrType) => team.abbr.toUpperCase() === team1abbr.toUpperCase());
  let team2abbrIndex = Abbreviations.findIndex((team: abbrType) => team.abbr.toUpperCase() === team2abbr.toUpperCase());

  if (team1abbrIndex > team2abbrIndex) {
    let temp = team2abbr;
    team2abbr = team1abbr;
    team1abbr = temp;

    let temp2 = team2abbrIndex;
    team2abbrIndex = team1abbrIndex;
    team1abbrIndex = temp2;
  }

	const team1full = Abbreviations[team1abbrIndex]?.full || '';
	const team2full = Abbreviations[team2abbrIndex]?.full || '';
	const gameIndex = splitReplayTitle[5].substring(1);

	return {
		region,
		seriesLetter,
		team1abbr,
		team2abbr,
		team1full,
		team2full,
		gameIndex
	}
}

export const logEvent = (ev: {
  date: Date,
  action: string,
  seriesLetter: string,
  gameIndex: string,
  groupName: string,
  team1: string,
  team2: string,
  actionText: string
}) => {
  const rawData = readFileSync('./console.log');
  const currentLog = JSON.parse(rawData.toString('utf8'));
  const newLog = [
    ...currentLog,
    ev
  ];
  writeFileSync('./console.log', JSON.stringify(newLog));
}