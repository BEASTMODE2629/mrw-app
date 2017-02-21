import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import NewGame from './NewGame';
import NewPlayer from './NewPlayer';
import WaitingToStart from './WaitingToStart';
import GamePlay from './GamePlay';
import GameOver from './GameOver';
import networking from './networking';

const playAreas = {
  NewGame: NewGame,
  NewPlayer: NewPlayer,
  WaitingToStart: WaitingToStart,
  GamePlay: GamePlay,
  GameOver: GameOver,
};

const _getGameStage = (playerInfo, gameInfo) => {
  return 'GameOver';
};

const testGameInfo = {
  id: 2,
  round: 2,
  image: 'http://i.imgur.com/rxkWqmt.gif',
  choices: {'2': 'he smells banana', '4': 'he is released into the backyard',
    '9': 'he is jumping off the couch'},
  waitingForScenarios: false,
  reactorID: 3,
  reactorNickname: 'Cinna',
  hostID: 2,
  scores: {'Cinna': 1, 'Momo': 0, 'Cara': 0},
  gameOver: false,
  winningResponse: '4',
  winningResponseSubmittedBy: 'Cara',
};

const testPlayerInfo = {
  id: 3,
  nickname: 'Cinna',
  response: null,
  score: 1,
  game: 2,
  submittedScenario: false,
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameInfo: null,
      playerInfo: null,
      errorMessage: null
    };
  }

  componentWillMount() {
    this._pollGameInfo();
    setInterval(this._pollGameInfo, 1000);
  }

  _getPlayAreaProps() {
    return {
      gameInfo: testGameInfo,
      playerInfo: testPlayerInfo,
      errorMessage: null
    };
  }

  render() {
    const gameStage = _getGameStage(
      this.state.playerInfo,
      this.state.gameInfo
    );
    const PlayArea = playAreas[gameStage];
    const props = this._getPlayAreaProps();
    return (
      <View style={styles.container}>
        <View style={gameStage == 'NewGame' ? styles.headerLarge : styles.headerSmall}>
          <Image
            source={require('../images/mrw.png')}
            style={gameStage == 'NewGame' ? styles.mrwLogoLarge : styles.mrwLogoSmall} />
          <Text>Info</Text>
          <Text>Settings</Text>
        </View>
        <View style={styles.playArea}>
          <PlayArea {...props}/>
        </View>
      </View>
    );
  }

  _pollGameInfo = async () => {
    await this._postToServer('getGameInfo');
  };

  _postToServer = async (action, data) => {
    if (!this.state.gameInfo || !this.state.gameInfo.hasOwnProperty('id') ||
      !this.state.gameInfo.id) {
      return;
    }
    try {
      let playerID = (
        (this.state.playerInfo && this.state.playerInfo.hasOwnProperty('id'))
         ? this.state.playerInfo.id : null);
      const res = await networking.postToServer(Object.assign({
        gameInfo: this.state.gameInfo.id,
        playerInfo: playerID,
        action: action,
      }, data));
      if (res.errorMessage) {
        this.setState({
          errorMessage: res.errorMessage
        });
      } else {
        this.setState({
          gameInfo: res.result.gameInfo,
          playerInfo: res.result.playerInfo
        });
      }
    } catch(error) {
      this.setState({
        errorMesage: 'Error communicating to server'
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  headerLarge: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mrwLogoLarge: {
    width: 170,
    height: 100,
  },
  headerSmall: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    alignItems: 'center',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mrwLogoSmall: {
    width: 85,
    height: 50,
  },
  playArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
