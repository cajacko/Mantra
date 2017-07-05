import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import style from 'components/AddButton/AddButton.style';

const AddButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={style.addButton}>
      <Text style={style.addButtonText}>+</Text>
    </View>
  </TouchableOpacity>
);

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default AddButton;