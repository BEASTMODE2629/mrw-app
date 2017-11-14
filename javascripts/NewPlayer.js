/* @flow */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from 'react-native-button';
import ErrorMessage from './ErrorMessage';

type propTypes = {
  createPlayer: (nickname: string) => Promise<void>,
  errorMessage: ?string,
};

export default class NewPlayer extends React.Component {
  props: propTypes;
  state: {
    nickname: string,
  };

  constructor(props: propTypes) {
    super(props);
    this.state = {
      nickname: ''
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.main}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder='What do you want to be called?'
                onChangeText={(text) => this.setState({nickname: text})}
                value={this.state.nickname}
                autoCorrect={false}
                autoCapitalize='words'
                maxLength={35}
                underlineColorAndroid='transparent' />
            </View>
            <Button
              containerStyle={[
                styles.submitContainer,
                {backgroundColor: this.state.nickname.trim() === '' ? '#eee' : '#4472C4'}
              ]}
              style={[
                styles.submitText,
                {color: this.state.nickname.trim() === '' ? '#333' : '#fff'}
              ]}
              onPress={() => {
                Keyboard.dismiss();
                this.props.createPlayer(this.state.nickname.trim());
              }} >
              Submit Nickname
            </Button>
            <ErrorMessage errorMessage={this.props.errorMessage} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
  },
  inputView: {
    borderColor: '#999',
    borderBottomWidth: 1,
  },
  input: {
    color: '#999',
    fontSize: 20,
    borderBottomWidth: 0,
    height: 36,
  },
  submitContainer: {
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#eee',
    marginTop: 10,
  },
  submitText: {
    fontSize: 20,
    color: '#333',
  },
});
