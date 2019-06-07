import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Board from './application/components/Board';

export default class App extends React.Component {
  render() {
    return (
    <View style={styles.container}>
      <Board />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf1',
    alignItems: 'center',   
    justifyContent: 'center',
  },
});


