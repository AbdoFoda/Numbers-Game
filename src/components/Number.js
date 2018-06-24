import React,{Component} from 'react';
import {StyleSheet,Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class Number extends Component {
  constructor(props) {
    super(props);
    this.state = {disabled:false};
  }
  static propTypes = {
    value: PropTypes.number.isRequired,
    idx : PropTypes.number.isRequired,
    parent : PropTypes.object
  }

  posStyle(index) {
    return ( (index%2)==0 ?styles.leftNumber : styles.rightNumber);
  }
  colStyle() {
    return ( (this.state.disabled) ? styles.pressedCol : styles.unPressedCol);
  }

  /*
    1-Disable button after press. (ok!)
    2-calculate the current summation and compare with target (ok!)
    3-set a timer ! (pending !)...

  */

  press() {
    this.setState({disabled:true});
  }

  unPress() {
    this.setState({disabled : false});
  }

  render() {
    return <TouchableOpacity disabled = {this.state.disabled} onPress = { () => {this.props.parent.pressed(this.props.value) ; this.press();}}
      style = { [styles.number , this.posStyle(this.props.idx) , this.colStyle()]}>
      <Text style = {styles.text}>
        {this.props.value}
      </Text>
    </TouchableOpacity>;
  }

}


const styles = StyleSheet.create(
  {

    number:{
      marginTop : 10,
    },
    pressedCol:{
      backgroundColor : 'green',
    },
    unPressedCol :{
      backgroundColor : 'white',
    },
    text :{
      textAlign :'center',
      fontSize  :50,
    },
    leftNumber:{
      marginLeft : 50,
      marginRight : 200,
    },
    rightNumber:{
      marginLeft: 200,
      marginRight: 50,
    }
  }
);
