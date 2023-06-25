import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Grey, White} from '../user/utils/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BiodataUser = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Grey}
        translucent
      />
      <View style={styles.ContainerIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-left'} size={46} color={White} />
        </TouchableOpacity>
        <Text style={styles.ContentTxt}>Biodata User</Text>
      </View>
    </View>
  );
};

export default BiodataUser;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  ContainerIcon: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  ContentTxt: {
    marginTop: '1%',
    fontSize: hp('3%'),
    color: White,
    fontWeight: '700',
    marginLeft: '25%',
  },
});
