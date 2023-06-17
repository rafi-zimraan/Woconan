import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grey, White} from '../utils/Colors';

const MyTextInput: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Grey,
      }}>
      <View style={{flexDirection: 'row', backgroundColor: White}}>
        <Icon
          name="user"
          size={26}
          color="#888"
          style={{
            marginHorizontal: 10,
            marginTop: '3%',
          }}
        />
        <TextInput style={{height: 40, width: 150}} placeholder="Username" />
      </View>
    </View>
  );
};

export default MyTextInput;
