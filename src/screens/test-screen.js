import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// import DateTimePicker from 'react-native-modal-datetime-picker';
import TestComponent from './TestComponent';
import { Screen } from '../styles';

export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false,
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  render() {
    return (
      <Screen>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <View style={{ height: 100 }}>
          <TestComponent
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>
      </Screen>
    );
  }
}
