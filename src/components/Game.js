import React, {Component} from 'react';
import {Alert,View ,Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Number from './Number' ;
export default class Game extends Component {
  static propTypes = {
    numbersCount : PropTypes.number.isRequired,
  };

  random(x) {
    return Math.floor(x*Math.random());
  }

  target = 0;

  constructor(props) {

    super(props);
    // this is a trial to take a random subset from the random
    // generated array! ... It's working now :)
    this.randomNumbers = Array
      .from({length:this.props.numbersCount})
      .map( () => this.random(10) +1 );
    var usedNumbers = parseInt(this.props.numbersCount/2);
    var redundantCopy = this.randomNumbers.slice();
    while(usedNumbers--) {
      var randomIndex = this.random(redundantCopy.length);
      var cur = redundantCopy[randomIndex];
      this.target += cur;
      redundantCopy.splice(randomIndex,1);
    }

  }



  currentSum = 0;
  pressed(val) {
    //console.log('Game function');
    //console.log(val);
    this.currentSum += val;
    // the problem is here !!
    // this is not my this
    console.log(this.target);
    if(this.currentSum === this.target) {
      // alert ('you are winner');
      Alert.alert(
        'Congratulation',
        'You Won!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }else if(this.currentSum > this.target) {
      Alert.alert(
        'Ops!',
        'You Failed',
        [
          {text: 'Try Again', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }
  }



  render() {
    return (
      <View style ={styles.container}>
        <Text style={styles.target}>
          {this.target}
        </Text>

        {
          this.randomNumbers.map( (number,index) => {
            return <Number  parent = {this} value = {number}
              key ={index} idx={index} style = { {width:50}}/>;
          })}

      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container:{
      paddingTop : 50,
      flex : 1,
      backgroundColor : 'black',
    },
    target:{
      marginHorizontal : 50,
      fontSize : 50,
      backgroundColor : 'white',
      height : 50,
      color: 'black',
      textAlign : 'center',
    } ,
    number:{
      marginTop : 10,
      textAlign:'center',
      fontSize : 50,
      backgroundColor :'white',
    },

  }
);
