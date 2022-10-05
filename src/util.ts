import { Replay } from "./types";

const Abbreviations = require('./Abbreviations.json');

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
} => {
	const splitReplayTitle = replay.replay_title.split(' ');
	const region = splitReplayTitle[0];
	const seriesLetter = splitReplayTitle[1];
	const team1abbr = splitReplayTitle[2];
	const team2abbr = splitReplayTitle[4];
	const t1key = Object.keys(Abbreviations).find(key => Abbreviations[key] === team1abbr) as string;
	const t2key = Object.keys(Abbreviations).find(key => Abbreviations[key] === team2abbr) as string;
	const team1full = Abbreviations[t1key];
	const team2full = Abbreviations[t2key];
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