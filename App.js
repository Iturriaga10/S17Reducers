import { StatusBar } from 'expo-status-bar';
import React, {useState, useReducer} from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  SETMULTIPLIER: 'setMultiplier'
}

function reducer(state, action){
  switch (action.type){
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 * state.multiplier, multiplier: state.multiplier };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 * state.multiplier, multiplier: state.multiplier };
    case ACTIONS.SETMULTIPLIER:
        return { count: state.count, multiplier: action.multiplier };
    default:
      return state;
  }
}

export default function App() {

  const [state, dispatch] = useReducer( reducer, { count:0, multiplier:1 } );
  const [text, onChangeText] = useState(1);

  const changeHandler = (value) => {
    if (!Number.isInteger(parseInt(value)) && value.length > 0) {
      Alert.alert('The multiplier is not an integer.');
      dispatch({type: ACTIONS.SETMULTIPLIER, multiplier: state.multiplier})
      onChangeText(state.multiplier);
    }  
    else {
      onChangeText(value);
    }
  } 

  return (
    <>
      <View style={styles.container}>
        <Text>Multiplier: </Text>
        <TextInput
          onChangeText={changeHandler}
          placeholder='1'
          keyboardType='numeric'
          value={text.toString()}
        />
        <Button 
          title="Set"
          onPress={() => dispatch({ type: ACTIONS.SETMULTIPLIER, multiplier: text })}
        />
      </View>
      <View style={styles.container}>
        <Button
          onPress={() => dispatch({ type: ACTIONS.DECREMENT })}
          title="-"
          color="#841584"
        />
        <Text>{state.count}</Text>
        <Button
          onPress={() => dispatch({ type: ACTIONS.INCREMENT })}
          title="+"
          color="#841584"
        />
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
