import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import Board from './application/components/Board';

export default class App extends React.Component {
  render() {
    return (
      <ImageBackground source={{ uri: "http://i68.tinypic.com/28s4sqw.png" }} style={{width: '100%', height: '100%'}}>
    <View style={styles.container}>
      <Board />
    </View>
    </ImageBackground>
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


