import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Black, Grey, White, krem} from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';

const HomeAdmin = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={White}
        translucent
      />
      <View style={styles.Content}>
        <View style={styles.ContentView}>
          <Icon name="account" size={36} color={Black} />
          <Text style={styles.TextUsername}>
            Haii, Rafi zimraan arjuna wijaya
          </Text>
        </View>
      </View>
      <View style={styles.Header}>
        <Image
          source={require('../icon/ProfileAdmin.png')}
          style={styles.imgProfile}
        />
      </View>
      <View style={styles.ContentDataUser}>
        <TouchableOpacity
          style={styles.ContentImg}
          onPress={() => navigation.navigate('karyaUser')}>
          <Image
            source={require('../icon/reading.png')}
            style={styles.imgDataUser}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ContentImg}
          onPress={() => navigation.navigate('biodataUser')}>
          <Image
            source={require('../icon/stats.png')}
            style={styles.imgDataUser}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ContentImg}
          onPress={() => navigation.navigate('profileAdmin')}>
          <Image
            source={require('../icon/personal.png')}
            style={styles.imgDataUser}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.TextBox}>
        <Text style={styles.txtBox}>Karya User</Text>
        <Text style={styles.txtBoxUser}>Biodata User</Text>
        <Text style={styles.txtBoxProfile}>Profile</Text>
      </View>
    </View>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  ContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    top: '5%',
  },
  TextUsername: {
    color: Black,
    fontFamily: 'Poppins-Medium',
  },
  Content: {
    flexDirection: 'row',
    paddingTop: '10%',
    backgroundColor: White,
    alignItems: 'center',
  },
  Header: {
    backgroundColor: White,
    height: hp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgProfile: {
    height: hp('20'),
    width: wp('49%'),
  },
  ContentImg: {
    borderRadius: 8,
    width: wp('16%'),
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: krem,
  },
  ViewContent: {
    marginTop: '3%',
  },
  ContentDataUser: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '10%',
  },
  TextContent: {
    color: White,
    fontFamily: 'Poppins-Medium',
  },
  TextContentProfile: {
    color: White,
    fontFamily: 'Poppins-Medium',
    marginLeft: '3%',
  },
  imgDataUser: {
    height: hp('5%'),
    width: wp('10%'),
  },
  TextBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txtBox: {
    color: White,
  },
  txtBoxUser: {
    color: White,
    marginRight: '3%',
  },
  txtBoxProfile: {
    color: White,
    marginRight: '3%',
  },
});
