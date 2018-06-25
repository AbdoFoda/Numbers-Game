import React, {Component} from 'react';
import Game from './Game';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      level : 1,
      numbersCount: 6,
      seconds : 30,
      score : 0,
    };
  }
  loadNextLevel() {
    
    this.setState({
      score : this.state.score + this.state.level * 10
    });
    this.setState({
      level : this.state.level + 1,
      seconds : Math.max(5,this.state.seconds -1),
    });
  }
  render() {
    return (
      <Game app ={this} numbersCount ={this.state.numbersCount} lvl = {this.state.level}  seconds={this.state.seconds}
        score = {this.state.score}/>
    );
  }
}
