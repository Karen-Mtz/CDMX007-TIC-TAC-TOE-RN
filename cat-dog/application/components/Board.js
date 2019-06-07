import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class Board extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.board, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            <Icon name="bone" style={styles.bone} />
          </View>
          <View style={[styles.board, { borderTopWidth: 0 }]}>
            <Icon name="cat" style={styles.cat} />
          </View>
          <View style={[styles.board, { borderTopWidth: 0, borderRightWidth: 0 }]}></View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={[styles.board, { borderLeftWidth: 0 }]}></View>
          <View style={styles.board}></View>
          <View style={[styles.board, { borderRightWidth: 0 }]}></View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={[styles.board, styles.green, { borderLeftWidth: 0, borderBottomWidth: 0 }]}></View>
          <View style={[styles.board, { borderBottomWidth: 0 }]}></View>
          <View style={[styles.board, { borderRightWidth: 0, borderBottomWidth: 0 }]}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  board: {
    borderWidth: 2,
    width: 100,
    height: 100,
    borderColor: "#7ed957"
  },
  bone: {
    color: "#7d6f5d",
    fontSize: 77,
    alignItems: "center",
    justifyContent: "center"
  },
  cat: {
    color: "#df7750",
    fontSize: 77,
    alignItems: "center",
    justifyContent: "center"
  }
});


