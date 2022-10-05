export type RequestOptions = {
	method: string,
	headers: {
		Authorization: string
	},
	body?: string
}

type Player = {
	start_time: number,
	end_time: number,
	name: string,
	id: {
		platform: string,
		id: string
	},
	score: number
}

type Team = {
	name: string,
	goals: 1,
	players: Player[]
}

export type Replay = {
	id: string,
	link: string,
	rocket_league_id: string,
	replay_title: string,
	map_code: string,
	map_name: string,
	playlist_id: string,
	playlist_name: string,
	duration: number,
	overtime: boolean,
	overtime_seconds: number,
	season: number,
	season_type: string,
	date: string,
	date_has_tz: boolean,
	visibility: string,
	created: string,
	uploader: {
		steam_id: string,
		name: string,
		profile_url: string,
		avatar: string
	},
	groups: {
		id: string,
		name: string,
		link: string
	}[],
	blue: Team,
	orange: Team
}

export type ReplayGroup = {
	id: string,
	link: string,
	name: string,
	created: string,
	player_identification: string,
	team_identification: string,
	direct_replays: number,
	indirect_replays: number,
	shared: boolean,
	user: {
		steam_id: string,
		name: string,
		profile_url: string,
		avatar: string
	}
}