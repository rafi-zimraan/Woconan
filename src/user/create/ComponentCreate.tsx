import React, {useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AbuABu,
  Black,
  Grey,
  GreyLight,
  White,
  krem,
  lightGray,
} from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ComponentCreate = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Grey}
        translucent={false}
      />
      <View style={styles.Header}>
        <Text style={styles.Txt}>Continue Writing</Text>
      </View>
      <View style={styles.Content}>
        <Text style={styles.TxtContent}>Write</Text>
      </View>
      <View style={styles.ContentUser}>
        <Image source={require('../icon/R.jpeg')} style={styles.Image} />
        <View style={styles.TxtContentUser}>
          <Text style={styles.TxtUser}>Stephen King</Text>
          <Text style={styles.TxtUser2}>1 of 1 parts published</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('edit')}>
        <View style={styles.Edit}>
          <View style={styles.ContentEdit}>
            <Image
              source={require('../icon/Group.png')}
              style={{
                height: hp('4%'),
                width: wp('8%'),
              }}
            />
            <Text style={styles.TxtEdit}>Edit another story</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('newStory')}>
        <View style={styles.Edit}>
          <View style={styles.ContentEdit}>
            <Icon name="plus-circle" size={35} color={White} />
            <Text style={styles.TxtEdit}>Create a new story</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ComponentCreate;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  Txt: {
    color: GreyLight,
    fontSize: hp('3%'),
    fontFamily: 'Poppins-Medium',
    top: '10%',
    fontWeight: '600',
  },
  Header: {
    marginTop: '13%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Content: {
    marginLeft: '3%',
    marginTop: '3%',
  },
  TxtContent: {
    fontSize: hp('3%'),
    fontFamily: 'Poppins-Medium',
    color: lightGray,
  },
  ContentUser: {
    flexDirection: 'row',
    marginLeft: '3%',
    backgroundColor: '#4D4D4D',
    width: wp('92%'),
  },
  Image: {
    width: wp('34%'),
    height: hp('27%'),
  },
  TxtContentUser: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2%',
  },
  TxtUser: {
    color: White,
    fontSize: hp('3%'),
    fontFamily: 'Poppins-Medium',
  },
  TxtUser2: {
    color: AbuABu,
    fontSize: hp('2%'),
  },
  Edit: {
    flexDirection: 'row',
    backgroundColor: krem,
    marginTop: '4%',
    height: hp('9%'),
    width: wp('92%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: '3%',
    borderRadius: 7,
  },
  ContentEdit: {
    flexDirection: 'row',
    marginLeft: '3%',
  },
  TxtEdit: {
    marginLeft: '5%',
    fontSize: hp('2.7%'),
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    color: White,
  },
});
