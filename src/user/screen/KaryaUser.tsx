import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Grey, White} from '../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const KaryaUser = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.Container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Grey} />
      <View style={styles.ContainerIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-left'} size={46} color={White} />
        </TouchableOpacity>
        <Text style={styles.ContentTxt}>Karya User</Text>
      </View>
      <View style={styles.KaryaUser}>
        <View style={styles.TxtUser}>
          <Text style={styles.TxtKaryaUser}>Rafi Zimraan Arjuna W</Text>
        </View>
        <View style={styles.img}>
          <Image source={require('../icon/Noval3.png')} style={styles.Novel} />
          <View style={styles.BookDescription}>
            <Text style={styles.Book}>Book Club</Text>
            <Text style={styles.BookDes}>
              Need a cover? I've got you covered. (Pun!) I can't write if my
              life depended on it, so I make covers for those who can.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default KaryaUser;

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
  KaryaUser: {
    backgroundColor: 'green',
    marginHorizontal: '3%',
    borderRadius: 10,
  },
  TxtUser: {
    marginLeft: '3%',
    top: '4%',
  },
  TxtKaryaUser: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp('2%'),
    color: White,
  },
  img: {
    flexDirection: 'row',
  },
  Novel: {
    height: hp('20%'),
    width: wp('30% '),
  },
  BookDescription: {
    marginTop: '3%',
    width: wp('60%'),
  },
  Book: {
    color: White,
    fontFamily: 'Poppins-Medium',
  },
  BookDes: {
    color: White,
    fontFamily: 'Poppins-Medium',
    marginTop: '3%',
  },
});
