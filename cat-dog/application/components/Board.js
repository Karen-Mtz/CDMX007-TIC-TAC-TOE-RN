import React from "react";
import { Button } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity, Image, Text, Modal, ImageBackground } from "react-native";

/*SE UTILIZA CONSTRUCTOR PORQUE EN ESTE COMPONENTE
INICIALIZAMOS UN ESTADO LOCAL Y USAMOS SUPER PARA QUE NO 
HAYA ERRORES AL ACCEDER A LOS PROPS */
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
      plays: 1,
      modalVisible: false,
      whoWhon: 0
    };
  }

/* ESTE MÉTODO LLAMA A UNA FUNCIÓN QUE 
LIMPIA EL TABLERO E INICIALIZA EL ESTADO 
DEL JUEGO CADA QUE SE CARGA EL COMPONENTE */
  componentDidMount() {
    this.initializeGame();
  }
/*ESTA FUNCION REINICIA EL ESTADO DEL JUEGO
ASIGNANDO NUEVOS ESTADOS (SE LLAMA CUANDO
SE CARGA EL COMPONENTE POR PRIMERA VEZ Y 
EN EL BOTÓN DE REINICIAR) */
  initializeGame = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
      plays: 1
    });
  };
/*ESTA FUNCIÓN ACTIVA EL MODAL (SE LLAMA 
CUANDO HAY UN GANADOR O HAY UN EMPATE)*/
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
/*ESTA FUNCION BUSCA A LOS GANADORES EN EJES Y & X
& DIAGONALES, COMO EL TABLERO SE COMPONE DE UN ARRAY
CON VALORES INICIALES EN 0 QUE VAN CAMBIANDO A 1 O -1 
EN CADA EVENTO. CADA QUE SE PRESIONA UNA CASILLA DEL 
TABLERO, SE HACE UNA SUMA DE LOS VALORES DE CADA FILA,
COLUMNA Y DIAGONAL. CUANDO ESTA SEA IGUAL A 3 O -3 HAY 
UN GANADOR  */
  getWinner = () => {
    const NUM_BOARD = 3;
    let boardState = this.state.gameState;
    let sum;

    //FILAS
    for (let i = 0; i < NUM_BOARD; i++) {
      sum = boardState[i][0] + boardState[i][1] + boardState[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //COLUMNAS
    for (let i = 0; i < NUM_BOARD; i++) {
      sum = boardState[0][i] + boardState[1][i] + boardState[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //DIAGONALES
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
  };

  /*ESTA FUNCIÓN SE EJECUTA CADA QUE UN USUARIO TOMA SU TURNO 
  Y PRESIONA UNA CASILLA DEL TABLERO.*/
  onBoardPress = (row, col) => {
  /*PRIMERO SE ASIGNA UNA VARIABLE QUE VA A CAMBIAR EL 
  ESTADO DE LOS TURNOS (PARA VERIFICAR SI HAY EMPATE 
  CUANDO HAYAN SUCEDIDO LAS 9 JUGADAS)*/
    let turns = this.state.plays + 1;
    this.setState({
      plays: turns
    })
  /*TAMBIÉN ESTA FUNCIÓN HACE QUE UNA CASILLA NO PUEDA SER SELECCIONADA
  DOS VECES (COMPRUEBA SI EL VALOR DE LAS CASILLAS ES DISTINTO A CERO
  Y SI LO ES, EVITA QUE SEA SELECCIONADA NUEVAMENTE)*/
    let value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }
  /*DESPUÉS OBTIENE EL JUGADOR ACTUAL PARA 
  CAMBIARLO EN CADA TURNO */
    let currentPlayer = this.state.currentPlayer;
  /*SE HACE UNA COPIA DEL ARRAY (TABLERO) CON EL MÉTODO
  SLICE PARA ASIGNARLE LOS NUEVOS VALORES (LOS CUALES
  SERÁN IGUALES AL JUGADOR ACTUAL (1 O -1) Y ASÍ IDENTIFICAR
  QUIÉN FUE EL GANADOR) */
    let boardArr = this.state.gameState.slice();
    boardArr[row][col] = currentPlayer;
    this.setState({ gameState: boardArr });
  /*PARA HACER EL CAMBIO DE JUGADORES SE USA
  UN OPERADOR CONDICIONAL TERNARIO PARA IDENTIFICAR
  SI ES 1 O -1 Y CAMBIARLO */
    let nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });
  /*PARA OBTENER A LOS GANADORES SE OBTIENE EL 
  RESULTAD DE LA FUNCION QUE SUMA LAS COLUMAS FILAS 
  Y DIAGONALES PARA VERIFICAR AL USUARIO GANADOR Y 
  ENVIAR LA INFORMACIÓN AL MODAL QUE ANUNCIARÁ AL GANADOR */
    let winner = this.getWinner();
    if (winner == 1) {
      this.setModalVisible(true)
      this.setState({
        whoWhon: "🐶 GANASTE"
      })
    } else if (winner == -1) {
      this.setModalVisible(true)
      this.setState({
        whoWhon: "🐱 GANASTE"
      })
    } else if (this.state.plays == 9 && winner != -1 && 1) {
      this.setModalVisible(true)
      this.setState({
        whoWhon: "EMPATE 🐶 🐱"
      })
    }
  };
  /*ESTA FUNCIÓN PINTA LOS PERSONAJES EN EL TABLERO
  RECIBE LAS COORDENADAS DE LAS FILAS Y COLUMNAS CUANDO
  ES EJECUTADA Y VERIFICA EL VALOR DE ESA CORDENADA
  (SI ES IGUAL A 1 MUESTRA UN PERRO, SI ES IGUAL A -1
  MUESTRA UN GATO ) */
  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
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
/* ESTA FUNCIÓN CONSULTA EL ESTADO DEL JUGADOR
PARA IDENTIFICAR QUIÉN ES EL SIGUIENTE */
  whosNext = () => {
    if (this.state.currentPlayer == 1) {
      return (
        "🐶"
      )
    } else if (this.state.currentPlayer == -1) {
      return (
        "🐱"
      )
    }
  }
/* RENDERIZADO DEL COMPONENTE 
- SE LLAMA A THIS.WHOSNEXT() PARA OBTENER EL TURNO DEL JUGADOR
- SE PINTA EL TABLERO CON 9 VIEWS, CADA UNO LLAMA A DOS FUNCIONES:
1) THIS.ONBOARDPRESS() LE ENVÍA LAS COORDENADAS O VALORES DEL ARRAY
LOS CUALES SERÁN MODIFICADOS DE ACUERDO AL CURRENT USER.
2) THIS.RENDERICON() IGUAL ENVÍA LOS VALORES (COORDENADAS) DEL ARRAY
PARA QUE ESTA FUNCIÓN CONSULTE EL CURRENT PLAYER Y ASIGNE EL VALOR 1 O -1
Y ASÍ MUESTRE PERRO O GATO DEPENDIENDO DEL TURNO 
ESTÁ EL MODAL QUE MUESTRA AL JUGADOR GANADOR LLAMANDO AL ESTADO DEL GANADOR
Y TIENE UN BOTÓN QUE LIMPIA EL TABLERO PARA UN NUEVO JUEGO.*/
  render() {
    return (
      <ImageBackground source={{ uri: "http://i65.tinypic.com/296gl5z.jpg" }} style={{ width: '100%', height: '100%' }}>
        <View>
          <View style={{ marginTop: 120, marginLeft: 38 }}>
            <Text style={styles.bigBlue}>{this.whosNext()} ES TU TURNO</Text>
          </View>
          <View style={{ marginTop: 35, marginLeft: 30 }}>
            <View style={{ flexDirection: "row" }}>
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

          <View style={{ marginTop: 22 }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}>
              <ImageBackground source={{ uri: "http://i65.tinypic.com/296gl5z.jpg" }} style={{ width: '100%', height: '100%' }}>
                <View style={{ marginTop: 22 }}>
                  <View style={{ marginTop: 230 }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 35,
                        color: "steelblue",
                        alignSelf: 'center'
                      }}
                    > {this.state.whoWhon} </Text>

                    <Button
                      title="¡JUGAR DE NUEVO!"
                      titleStyle={{ color: 'white' }}
                      type="clear"
                      containerStyle={[{ backgroundColor: 'palevioletred', borderRadius: 30, width: 200, marginLeft: 85, marginTop: 40 }]}
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                        this.setState({
                          gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                          currentPlayer: 1,
                          plays: 1
                        });
                      }}>
                    </Button>
                  </View>
                </View>
              </ImageBackground>
            </Modal>
          </View>

          <Button
            title="REINICIAR"
            titleStyle={{ color: 'white' }}
            type="clear"
            containerStyle={[{ marginTop: 16, backgroundColor: 'lightcoral', borderRadius: 30, width: 140, marginLeft: 30 }]}
            onPress={this.initializeGame}>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  board: {
    borderWidth: 2,
    width: 100,
    height: 100,
    borderColor: "steelblue"
  }, bigBlue: {
    color: "palevioletred",
    fontWeight: 'bold',
    fontSize: 35,
    alignSelf: 'auto'
  }
});
