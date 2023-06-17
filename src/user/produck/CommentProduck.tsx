import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Black, Grey, White} from '../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CommentProduck = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={White}
        translucent={false}
      />
      <View style={styles.ContainerIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-left'} size={40} color={Black} />
        </TouchableOpacity>
        <Text style={styles.ContentTxt}>Comment</Text>
        <TouchableOpacity>
          <Icon name="magnify" size={40} color={Black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentProduck;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: White,
  },
  ContainerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '1%',
    marginTop: '2%',
  },
  ContentTxt: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    fontSize: hp('3%'),
    color: Black,
    fontWeight: '700',
  },
});
