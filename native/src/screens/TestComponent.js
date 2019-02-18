import React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';

const TestComponent = ({ isVisible, onConfirm, onCancel }) => (
  <DateTimePicker isVisible={isVisible} onConfirm={onConfirm} onCancel={onCancel} mode="datetime" />
);

export default TestComponent;
