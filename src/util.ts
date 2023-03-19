import { LogEvent, Replay } from "./types";
import { appendFileSync, readFileSync, writeFileSync } from 'fs';

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const splitReplayTitle = (replay: Replay): {
	region: string,
	seriesLetter: string,
	team1abbr: string,
	team2abbr: string,
	gameIndex: string
} => {
	const splitReplayTitle = replay.replay_title.split(' ').filter(e => e.length > 0);
  if (splitReplayTitle.length < 6) {
    throw new Error(`Couldn't parse the replay title: ${replay.replay_title}`);
  };
	const region = splitReplayTitle[0];
	const seriesLetter = splitReplayTitle[1];
	let team1abbr = splitReplayTitle[2];
	let team2abbr = splitReplayTitle[4];

  if (team1abbr > team2abbr) {
    let temp = team2abbr;
    team2abbr = team1abbr;
    team1abbr = temp;
  }
	const gameIndex = splitReplayTitle[5].substring(1);

	return {
		region,
		seriesLetter,
		team1abbr,
		team2abbr,
		gameIndex
	}
}

export const logEvent = (ev: LogEvent) => {
  let rawData;
  let currentLog;
  try {
    rawData = readFileSync('./console.log');
    currentLog = JSON.parse(rawData.toString('utf8'));
  } catch (error) {
    currentLog = []
  }
  const newLog = [
    ...currentLog,
    ev
  ];
  writeFileSync('./console.log', JSON.stringify(newLog));
}

export const getJsonLog = () => {
  let file: string = readFileSync('./console.log', 'utf-8');
  let fileJson: LogEvent[] = JSON.parse(file);
  return fileJson;
}