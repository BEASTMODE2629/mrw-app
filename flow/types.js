// Flow type aliases
/* @flow */

export type ImageUrl = {
  url: string,
  id: number,
  prefetched?: boolean,
  localUri?: string,
};

export type GameInfo = {
  id: number,
  round: ?number,
  image: ?ImageUrl,
  waitingForScenarios: boolean,
  reactorID: ?number,
  reactorNickname: ?string,
  hostID: number,
  gameOver: boolean,
  winningResponse: ?string,
  winningResponseSubmittedBy: ?string,
  scores: Object,
  choices: Object,
  lastGif: ?string,
  displayOrder: ?string,
  imageQueue: ?Array<ImageUrl>,
  responsesIn: number,
  timeLeft?: number,
};

export type PlayerInfo = {
  id: number,
  nickname: string,
  accessToken: ?string,
  roundOfLastResponse: ?number,
  response: ?string,
  score: ?number,
  game: ?number,
  submittedScenario: ?boolean,
};

export type ServerPostData = {
  gameID: number | null,
  playerID: number | null,
  action: string,
  gameCode?: string,
  nickname?: string,
  choiceID?: string,
  round?: number,
  response?: string,
  image?: ?ImageUrl,
};

export type ServerResult = {
  result?: {
    gameInfo: GameInfo | null,
    playerInfo: PlayerInfo | null,
  },
  errorMessage: null | string,
};
