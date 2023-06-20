import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  StatusBar,
  View,
  ActivityIndicator,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RootStackParams} from '../../App';
import {Grey, White} from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const getToken = async () => {
    try {
      let value = await AsyncStorage.getItem('token');

      if (value !== null && value !== '') {
        navigation.navigate('bottom');
      } else {
        navigation.navigate('login');
      }
    } catch (e) {
      console.log('getToken', e);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('homeAdmin');
      getToken();
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Grey}
        translucent={false}
      />
      <Image source={require('../icon/AppPostman.png')} style={styles.Icon} />
      <View style={{top: '20%'}}>
        <ActivityIndicator size={'large'} color={White} />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Grey,
  },
  Icon: {
    width: wp('25%'),
    height: hp('14%'),
  },
});
