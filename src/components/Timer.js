import React,{Component} from 'react';
import {StyleSheet,Text} from 'react-native';
import PropTypes from 'prop-types';


export default class Timer extends Component {
  static propTypes ={
    seconds : PropTypes.number.isRequired ,
    parent : PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {seconds : this.props.seconds};
    this.props.parent.addTimer(this);
    this.setTimer();
  }

  setTimer() {
    this.myInterval = setInterval( ()=> {
      if(this.state.seconds == 0) {
        this.stopTimer();
        this.props.parent.timeOut();
      }else{
        this.setState({seconds : this.state.seconds -1});
      }
    } , 1000);
  }

  stopTimer() {
    clearInterval(this.myInterval);
  }

  render() {
    return <Text style = {styles.timer}>
      Time : {this.state.seconds}
    </Text>;
  }
}

const styles = StyleSheet.create(
  {
    timer :{
      margin : 20,
      marginHorizontal : 50,
      textAlign :'center',
      backgroundColor : 'white',
      color : 'black',
      fontSize : 50
    }
  }
);
