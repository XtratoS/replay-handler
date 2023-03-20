# replay-handler
## What is this?
This is an automatic replay sorter for RLCS replays, which sorts replays into corresponding groups according to the provided configuration.
## Features
- Automatic replay sorter
- a user-interface to see actions as they happen
- a user-interface to create the configuration file
## How to use it?
### Replays Nomenclature
This naming structure was agreed upong for MENA region specifically, if you'd like to use this project without having to modify the code, you'd have to stick with the nomenclature as follows:<br/>

(<span style="color: green">**REGION**</span>) (<span style="color: green">**MATCH_ID**</span>) (<span style="color: green">**T1**</span>) vs (<span style="color: green">**T2**</span>) G{NUM} {YEAR}-{MONTH}-{DAY}.{HOUR}.{MIN}

Words between `()` need to be replaced manually while those between `{}` will be automatically replaced by bacllchasing auto-uploader plugin in bakkesmod<br/>

Variable items description:
|Item|Description|Examples|
|:-|:-|:-|
|REGION|The replay region|MENA|
|MATCH_ID|Series Identifier|A <small>or</small> P-A|
|T1|Team 1 name/abbreviation|FLCN|
|T2|Team 2 name/abbreviation|R1|

- Match IDs can be dash or underscore separated strings.
- Team names shouldn't contain spaces as it's the default delimiter, please use underscores or dashes within team names instead.

Example name to be input into bakkesmod's auto-replay uploader plugin:

	MENA P-K FLCN vs R1 G{NUM} {YEAR}-{MONTH}-{DAY}.{HOUR}.{MIN}

### Initial Installation
#### Installing Node.js
- Install node.js (guaranteed to work on node v18) from [node.js official website](https://nodejs.org/en)
- Verify it's installed by running `node --version` in any command-line window, it will show the current version of node.js installed, it shows `v18.14.2` for me.
#### Installing Dependancies
- Install dependancies by running `npm i` in this project's root directory
#### Building The Project
- Build the project by running `npm run build` in the project's root directory
- The built project should be available in the **`/build`** directory
#### Configuration Files
example configuration files can be found in the **`/src`** directory, please make sure to rename them after copying to remove the .example from the filenames
##### 1. Secret.env
Secret.env contains several variables that need to be configured
1. BALLCHASING_TOKEN 
	- This is the upload token of the account that will be used to upload replays which shall be sorted, can be acquired from [Ballchasing](ballchasing.com)
	- When pasting the token please keep the double quotations around it.
2. BALLCHASING_PORT
	- This is the port that will be used to view the replay updates as the replays handler handles them.
	- Using the default port (3003), if you serve this locally, you should go to [http://localhost:3003](http://localhost:3003) to access it.
	- If you need to serve this over the network, you need to make sure to expose the port correctly.
3. REPLAY_NAME_DELIMITER - <span style="color: red">beta</span>
	- The character that's used to split the replay name, default is space.
4. CONSIDERED_REGIONS - <span style="color: red">not implemented yet</span>
	- The regions which will be considered by the replay sorter.
##### 2. config.json

This file contains a single key-value pair, the key is **matchGroups** and the value is a JSON array of objects.<br/>
Every object contains a **groupId** and a set of **Match IDs** to be added to the corresponding groupId.<br/>

Following is an example file
```json
{
  "matchGroups": [
    {"groupId": "quarterfinals-3nwt4jtfpz", "matches": ["A", "B", "C", "D"]},
    {"groupId": "semifinals-lb661h3ol6", "matches": ["E", "F"]},
    {"groupId": "final-dle1of2rmm", "matches": ["G"]}
  ]
}
```
In this file we notice that matches A, B, C and D will be added to the group [quarterfinals-3nwt4jtfpz](https://ballchasing.com/group/quarterfinals-3nwt4jtfpz)

The replay sorter have created child groups, using the team names provided in the replay names and every replay was added to the corresponding group.

### Running The Project:
Run `npm start` in the root directory of this project.<br/>
You should see the following in the command-line shell:

```shell
BALLCHASING logger is now listening on port <BALLCHASING_PORT>
```
The program will keep pinging every 10 seconds for sanity checks.

Example shell output after around 1 minute:
```
BALLCHASING logger is now listening on port 3003
1: Ping!
2: Pong!
3: Ping!
4: Pong!
5: Ping!
```
### Using the config maker:
The configuration file maker is a simple page that enables creating configuration files via a user-friendly interface.

Once the project is running, the configuration maker can be accessed via <a href="http://localhost:3003/config_maker" target="_blank">http://localhost:3003/config_maker</a> (using the default configuration)<br/>
Configuration files created can then be downloaded and can replace the `config.json` file in the `/build` directory.

### How This Works Under The Hood:
- When first ran, the script stores the latest N replays uploaded by the owner of the ballchasing API token provided in the .env file.
- Every 10 seconds, a new request is sent to ballchasing.com's API to get the most recent N replays and figure out if there are any new replays.
- If there are any new replays, their name is parsed in-order to figure out if they go into any of the groups in the configuration file.
- Both the action viewer and config maker run in the background in express.js servers.

### License and Usage:
Feel free to use this software anyway you like, with or without referencing - though referencing to this is appreciated.