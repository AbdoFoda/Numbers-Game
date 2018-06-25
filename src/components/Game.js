import React, {Component} from 'react';
import {Alert,View ,Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Number from './Number' ;
import Timer from './Timer';

export default class Game extends Component {
  static propTypes = {
    numbersCount : PropTypes.number.isRequired,
    lvl : PropTypes.number.isRequired,
    seconds : PropTypes.number.isRequired,
    score : PropTypes.number.isRequired,
  };

  random(x) {
    return Math.floor(x*Math.random());
  }

  numbersComponent = [];
  addNumber(number) {
    this.numbersComponent.push(number);
  }

  addTimer (timer) {
    this.timer = timer;
  }

  refreshNumbers() {
    this.currentSum = 0;
    this.numbersComponent.map( (numberComponent) => numberComponent.unPress());
  }

  target = 0;
  constructor(props) {

    super(props);
    // this is a trial to take a random subset from the random
    // generated array! ... It's working now :)
    this.state = {randomNumbers :Array() ,seconds : this.props.seconds ,
      target : 0 , lvl : this.props.lvl , score : this.props.score};
    this.level = this.props.lvl;
    this.score = this.props.score;
    this.seconds = this.props.seconds;
    this.initGame();

  }

  componentDidMount() {
    this._isMounted = true;
  }
  initState() {
    if(this._isMounted) {
      this.setState( {randomNumbers : Array
        .from({length:this.props.numbersCount})
        .map( () => this.random(this.level * 10) +1) ,
      seconds : this.seconds ,
      target : 0 ,
      lvl :this.level ,
      score : this.score
      } );
    }
    else {
      this.state.randomNumbers = Array
        .from({length:this.props.numbersCount})
        .map( () => this.random(this.level * 10) +1);
      this.state.seconds = this.seconds;
      this.state.target = 0;
      this.state.lvl = this.level;
      this.state.score = this.score;
    }
  }

  initGame() {

    this.initState();
    this.currentSum = 0;
    var usedNumbers = parseInt(this.props.numbersCount/2);
    var redundantCopy = this.state.randomNumbers.slice();
    while(usedNumbers--) {
      var randomIndex = this.random(redundantCopy.length);
      var cur = redundantCopy[randomIndex];
      if(this._isMounted) {
        this.setState({target : this.state.target + cur});
      }else{
        this.state.target += cur;
      }
      redundantCopy.splice(randomIndex,1);
    }
  }

  refreshTimer() {
    if(this.timer) {
      this.timer.setState({seconds:this.props.seconds});
      this.timer.setTimer();
    }
  }





  currentSum = 0;
  pressed(val) {
    this.currentSum += val;
    if(this.currentSum === this.state.target) {
      this.timer.stopTimer();
      Alert.alert(
        'Congratulation',
        'You Won!',
        [
          {text: 'Next Level' , onPress :()=>{this.loadNextLevel();}},
        ],
        { cancelable: false }
      );
    }else if(this.currentSum > this.state.target) {
      Alert.alert(
        'Ops!',
        'You Failed',
        [
          {text: 'Try Again' , onPress:  () =>{this.refreshNumbers();} }
        ]
      );
    }
  }


  timeOut() {
    Alert.alert('Ops!' , 'Time Out!' ,
      [
        {text : 'refresh' , onPress : () =>{this.initGame();this.refreshTimer();this.refreshNumbers();}}
      ]
    );


  }

  loadNextLevel() {
    this.seconds = Math.max(this.seconds -1 , 5);
    this.score = this.score + this.level * 10;
    this.level ++;

    this.initGame();
    this.refreshTimer();
    this.refreshNumbers();
  }


  render() {
    return (
      <View style ={styles.container}>
        <View style = {styles.header}>
          <Text style={styles.level}>
          Lv : {this.state.lvl}
          </Text>
          <Text style={styles.score} >
            Score : {this.state.score}
          </Text>
        </View>
        <Timer parent = {this} seconds = {this.state.seconds} />
        <Text style={styles.target}>
          Sum : {this.state.target}
        </Text>

        {
          this.state.randomNumbers.map( (number,index) => {
            return <Number  parent = {this} value = {number}
              key ={index} idx={index} style = { {width:50}}/>;
          })}

      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    score :{
      fontSize : 20,
      color : 'orange',
    } ,
    header : {
      display : 'flex',
      flexWrap : 'nowrap',
      flexDirection : 'row',
      justifyContent : 'space-around',
    },
    level :{
      color : 'orange',

      fontSize : 20,
    },
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
