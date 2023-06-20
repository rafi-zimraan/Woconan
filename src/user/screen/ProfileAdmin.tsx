import React from 'react';
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Abu, AbuABu, Black, Grey, GreyLight, White} from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileAdmin = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // {'logout with application'}
  const logout = () => {
    AsyncStorage.getItem('token').then(value => {
      var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };
      fetch(
        'https://45a4-2001-448a-4042-41bf-e3dd-7625-3602-b07e.ngrok-free.app/api/logout',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);
          AsyncStorage.removeItem('token');
          navigation.replace('login');
        })
        .catch(error => console.log('error', error));
    });
  };
  // {'WARNING LOGOUT'}
  const Warning = () => {
    Alert.alert('Perhatian !', 'Apakah anda ingin keluar', [
      {
        text: 'tidak',
      },
      {
        text: 'ok',
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <View style={styles.Container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Grey} />
      <View style={styles.ContainerIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-left'} size={39} color={White} />
        </TouchableOpacity>
        <Text style={styles.ContentTxt}>Profile</Text>
        <TouchableOpacity onPress={() => Warning()}>
          <Image
            source={require('../icon/check-out.png')}
            style={styles.ImgLogout}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.ContentProfile}>
        <View style={styles.ViewProfile}>
          <Image
            source={require('../image/profilePicture.png')}
            style={styles.imgPeople}
          />
          <TouchableOpacity>
            <Image
              source={require('../icon/vertIcon.png')}
              style={styles.imgTitik3}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.TxtAdmin}>
          <Text style={styles.AdminText}>Rafi zimraan arjuna wijaya</Text>
        </View>
        <View style={styles.DescriptionAdmin}>
          <Text style={styles.DescriptionText}>Programmer at</Text>
          <Text style={styles.DescriptionText2}>The Hague Security Delta </Text>
        </View>
        <View style={styles.ViewTelefon}>
          <TouchableOpacity style={styles.Telefone}>
            <Icon name={'phone'} size={30} color={'#6418C3'} />
          </TouchableOpacity>
          <Text style={styles.TxtNumber}>62+ 2343 343 434 343</Text>
        </View>
        <View style={styles.ViewTelefon}>
          <TouchableOpacity style={styles.Telefone}>
            <Icon name="email-outline" size={38} color="#6418C3" />
          </TouchableOpacity>
          <Text style={styles.TxtNumber}>62+ 2343 343 434 343</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileAdmin;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  ContainerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '1%',
    marginTop: '10%',
  },
  ImgLogout: {
    height: hp('4.4%'),
    width: wp('7.5%'),
    top: '3%',
    marginRight: '2%',
  },
  ContentProfile: {
    backgroundColor: White,
    marginHorizontal: '12%',
    borderRadius: 10,
    marginTop: '6%',
    width: wp('75%'),
    height: hp('60%'),
  },
  ViewProfile: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ContentTxt: {
    fontSize: hp('3%'),
    color: White,
    fontWeight: '700',
  },
  imgPeople: {
    top: '7%',
    marginLeft: '24%',
  },
  imgTitik3: {
    top: '10%',
  },
  TxtAdmin: {
    marginTop: '8%',
    alignItems: 'center',
  },
  AdminText: {
    fontSize: hp('1.7%'),
    fontFamily: 'Poppins-Medium',
    color: Black,
  },
  DescriptionAdmin: {
    marginTop: '10%',
    alignItems: 'center',
  },
  DescriptionText: {
    fontSize: hp('1.7%'),
    fontFamily: 'Poppins-Medium',
    color: Black,
  },
  DescriptionText2: {
    fontSize: hp('1.9%'),
    fontFamily: 'Poppins-Bold',
    color: '#6418C3',
  },
  ViewTelefon: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  Telefone: {
    backgroundColor: AbuABu,
    width: wp('12%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  TxtNumber: {
    marginLeft: '6%',
    color: Black,
    fontWeight: '900',
  },
});
