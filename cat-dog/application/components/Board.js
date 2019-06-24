import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Image,
  Text
} from "react-native";

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
      plays: 1
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
      plays: 1
    });
  };

  //Return 1 if player 1 won, -1 if player 2 won or 0 if no one has won.
  getWinner = () => {
    const NUM_BOARD = 3;
    var boardState = this.state.gameState;
    var sum;

    //Checking rows
    for (var i = 0; i < NUM_BOARD; i++) {
      sum = boardState[i][0] + boardState[i][1] + boardState[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //checking columns
    for (var i = 0; i < NUM_BOARD; i++) {
      sum = boardState[0][i] + boardState[1][i] + boardState[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //checking diagonals
    sum = boardState[0][0] + boardState[1][1] + boardState[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = boardState[2][0] + boardState[1][1] + boardState[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    //No winners
  };

  onBoardPress = (row, col) => {
    let turns = this.state.plays + 1;
    this.setState({ 
      plays: turns
    })
    console.log(this.state.plays)
    //Don't allow double touch on board
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    } 

    //Grab current player
    var currentPlayer = this.state.currentPlayer;

    //Getting board
    var boardArr = this.state.gameState.slice();
    boardArr[row][col] = currentPlayer;
    this.setState({ gameState: boardArr });

    //Switching players
    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    //Getting Winners
    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("¡DOG ES EL GANADOR!");
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert("¡CAT ES EL GANADOR!");
      this.initializeGame();
    } else if (this.state.plays == 9 && winner != -1 && 1) {
      Alert.alert("no one has won");
      this.initializeGame();
    }
  };

  
  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return (
          <Image
            source={{ uri: "http://i67.tinypic.com/r0q9zb.png" }}
            style={{
              width: 65,
              height: 65,
              alignSelf: "center",
              marginVertical: 18
            }}
          />
        );
      case -1:
        return (
          <Image
            source={{ uri: "http://i65.tinypic.com/j5dlso.png" }}
            style={{
              width: 65,
              height: 65,
              alignSelf: "center",
              marginVertical: 18
            }}
          />
        );
      default:
        return <View />;
    }
  };

  whosNext = () => {
    if(this.state.currentPlayer == 1) {
      return (
        <Image
            source={{ uri: "http://i67.tinypic.com/r0q9zb.png" }}
            style={{
              width: 40,
              height: 40,
              alignSelf: "center",
              marginVertical: 18
            }}
          />
      )
    } else if (this.state.currentPlayer == -1) {
      return (
        <Image
        source={{ uri: "http://i65.tinypic.com/j5dlso.png" }}
        style={{
          width: 40,
          height: 40,
          alignSelf: "center",
          marginVertical: 18
        }}
      />
      )
    }
  }

  render() {
    return (
      <View>

<View style={{marginBottom: 30}}><Text style={styles.bigBlue}>SIGUIENTE JUGADOR:</Text> 

{this.whosNext()}
</View>
       
       <View style={{marginBottom: 30}}>
        <View style={{ flexDirection: "row"}}>
          <TouchableOpacity
            onPress={() => this.onBoardPress(0, 0)}
            style={[styles.board, { borderLeftWidth: 0, borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onBoardPress(0, 1)}
            style={[styles.board, { borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onBoardPress(0, 2)}
            style={[styles.board, { borderTopWidth: 0, borderRightWidth: 0 }]}
          >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onBoardPress(1, 0)}
            style={[styles.board, { borderLeftWidth: 0 }]}
          >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onBoardPress(1, 1)}
            style={styles.board}
          >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onBoardPress(1, 2)}
            style={[styles.board, { borderRightWidth: 0 }]}
          >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onBoardPress(2, 0)}
            style={[
              styles.board,
              styles.green,
              { borderLeftWidth: 0, borderBottomWidth: 0 }
            ]}
          >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onBoardPress(2, 1)}
            style={[styles.board, { borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onBoardPress(2, 2)}
            style={[
              styles.board,
              { borderRightWidth: 0, borderBottomWidth: 0 }
            ]}
          >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
          </View>
        </View>

       
        <Button title="REINICIAR JUEGO" onPress={this.initializeGame}/>
      
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
  }, bigBlue: {
    color: "#00ced1",
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center'
  }
});
